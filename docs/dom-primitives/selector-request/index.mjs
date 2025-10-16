/**
 * Selector-Request Parser
 * 
 * Parses URLs with embedded CSS selectors using the #(selector=...) syntax
 * 
 * Examples:
 * - /path -> { href: '/path', selector: null }
 * - http://example.com/path -> { href: 'http://example.com/path', selector: null }
 * - #(selector=p) -> { href: null, selector: 'p' }
 * - http://example.com/path#(selector=p) -> { href: 'http://example.com/path', selector: 'p' }
 * - #(selector=tr:nth-child(15)) -> { href: null, selector: 'tr:nth-child(15)' }
 */

export function parseSelectorRequest(target) {
    if (!target) {
        return { href: null, selector: null };
    }
    
    // Look for #(selector= pattern
    const selectorStartIndex = target.indexOf('#(selector=');
    
    if (selectorStartIndex === -1) {
        // No selector syntax, entire target is the href
        return { href: target, selector: null };
    }
    
    // Found the selector pattern
    const selectorStart = selectorStartIndex + 11; // Length of '#(selector='
    
    // Find the matching closing parenthesis by counting parentheses
    let parenCount = 1;
    let i = selectorStart;
    while (i < target.length && parenCount > 0) {
        if (target[i] === '(') parenCount++;
        else if (target[i] === ')') parenCount--;
        i++;
    }
    
    if (parenCount !== 0) {
        // Malformed selector syntax (unmatched parentheses)
        console.warn('Selector-Request: Malformed selector syntax, unmatched parentheses');
        return { href: target, selector: null };
    }
    
    // Successfully found matching parenthesis
    const selector = target.substring(selectorStart, i - 1);
    
    // Get the base path (everything before #(selector=)
    const basePath = target.substring(0, selectorStartIndex);
    
    return {
        href: basePath || null,
        selector: selector
    };
}

/**
 * Resolves relative URLs to absolute URLs
 * @param {string} href - The href to resolve (can be relative or absolute)
 * @param {string} base - The base URL to resolve against (defaults to window.location.href)
 * @returns {string} The absolute URL
 */
export function resolveHref(href, base = window.location.href) {
    if (!href) return null;
    
    // If it's already an absolute URL, return as-is
    if (href.match(/^https?:\/\//)) {
        return href;
    }
    
    // Resolve relative URL
    try {
        return new URL(href, base).href;
    } catch (error) {
        console.error('Selector-Request: Failed to resolve URL', { href, base, error });
        return href;
    }
}

/**
 * Combines parsing and resolution into a single function
 * @param {string} target - The target string to parse
 * @param {string} base - The base URL for resolution (defaults to window.location.href)
 * @returns {Object} { href: string|null, selector: string|null }
 */
export function parseAndResolve(target, base = window.location.href) {
    const parsed = parseSelectorRequest(target);
    
    // If no href and we have a selector, default to current page
    if (!parsed.href && parsed.selector) {
        parsed.href = base;
    } else if (parsed.href) {
        // Resolve relative URLs
        parsed.href = resolveHref(parsed.href, base);
    }
    
    return parsed;
}

// Export default as the main parsing function
export default parseSelectorRequest;