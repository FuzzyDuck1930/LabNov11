export enum CardElement{
    "prodImg" = "prodImg",
    "prodName"= "prodName",
    "price" = "price",
    "stock" = "stock"
}

class theCard extends  HTMLElement {
    prodImg?: string;
    prodName?:string;
    price?:string;
    stock?: string

    static get observedAttributes(){
        const attrs: Record<CardElement,null> = {
            prodImg: null,
            prodName: null,
            price: null,
            stock: null
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName:CardElement, oldValue: string | undefined, newValue: string | undefined ){
        switch(propName){
            default:
            this[propName] = newValue;
            break;
        }

    }

    constructor() {
        super()
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <img src="${this.prodImg}" alt="">
            <h2>${this.prodName}</h2>
            <p>${this.price}</p>
            <p>${this.stock}</p>
            `;
        }
        }
    }

customElements.define("app-card", theCard)
export default theCard;