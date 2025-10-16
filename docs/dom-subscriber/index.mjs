
class DOMSubscription extends Array {
    constructor( root, selector, callback ) {
        super();
        this.push( callback );
        this.selector = selector;
        this.subscribedTo = root;
    }

    get matching() {
        return this.subscribedTo.querySelectorAll( this.selector );
    } 
}

class DOMSubscriber {

    static subscribe( root, selector, callback ) {
        let subscriptions = {};
        if (!(root instanceof HTMLElement)) {
            root = document.querySelector(root);            
        }
        if (!root) {
            throw new Error('Root element not found');
        }

        if ( root.observer ) {
            subscriptions = root.observer.subscriptions
        }

        if ( Reflect.has( subscriptions, selector )) {
            subscriptions[ selector ].push( callback );
        } else {
            subscriptions[ selector ] = new DOMSubscription( root, selector, callback );
        }

        if (!root.observer) {
            // set up the mutation observer
            root.observer = new MutationObserver( function( mutationList, observer ) {
                const registry  = subscriptions;
                const selectors = Object.keys( registry );
                for ( const mutation of mutationList ) {
                    const withNodes = (node) => {
                        for ( const selector of selectors ) {
                            // we want to test the node and its children
                            let runWithNode;
                            if ( node.matches && node.matches( selector )) runWithNode = node;
                            else {
                                if ( node.querySelector && node.querySelector( selector ))
                                    runWithNode = node.querySelector( selector );
                            } 
                                    
                            if ( runWithNode ) {
                                for ( const cb of registry[ selector ] ) {
                                    cb( runWithNode, registry[ selector ] );
                                }      
                            }
                        }
                    };
                    if ( mutation.addedNodes.length > 0 ) {
                        mutation.addedNodes.forEach( withNodes );
                    }
                    if ( mutation.removedNodes.length > 0 ) {
                        mutation.removedNodes.forEach( withNodes );
                    }
                }
            });
            root.observer.observe(root, { childList: true, subtree: true });
        }

        const shadows = this.customElementRoots() || [];
        const nodes = Array.from( [root, ...shadows].filter( e => !!e ).map( e => {
            const queryResults = e.querySelectorAll( selector );
            return Array.from( queryResults );
        }) ).flat();
        for ( const node of nodes ) {
            for ( const cb of subscriptions[ selector ] ) {
                cb( node, subscriptions[ selector ] );
            }      
        }        
    }

    static customElementRoots () {
        const customElements = Array.from( document.getElementsByTagName('*') ).filter( (e) => {        
            return !!self.customElements.get(e.nodeName.toLowerCase());
        });
        return customElements.map( e => e.shadowRoot );        
    }    

}

export { DOMSubscriber };
export default DOMSubscriber;
