import { addProduct, getProducts } from './utils/firebase';
import firebase from './utils/firebase';
import card from "./components/card"
import theCard, { CardElement } from "./components/card"

const formPost = {
    name:"",
    quantity: "",
    price: "",
    imageUrl: "",
    };

class AppContainer extends  HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"});
    }

    async uploadform() {
        console.log(formPost)
        firebase.addProduct(formPost);
    }

    connectedCallback() {
        this.render()
    }

    changeimg(e: any) {
        formPost.imageUrl = e.target.value; }

    changeprice(e: any) {
        formPost.price = e.target.value; }

    changequantity(e: any) {
        formPost.quantity = e.target.value; }

    changename(e: any) {
        formPost.name = e.target.value; }

    async render() {


        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;

        const Space = this.ownerDocument.createElement("div");
        this.shadowRoot?.appendChild(Space);

        const putImg = this.ownerDocument.createElement("input");
        putImg.placeholder = "Url to the image of your product"
        putImg.addEventListener("change", this.changeimg);
        Space.appendChild(putImg);

        const putName = this.ownerDocument.createElement("input");
        putName.placeholder = "Name of your product"
        putName.addEventListener("change", this.changename);
        Space.appendChild(putName);

        const putPrice = this.ownerDocument.createElement("input");
        putPrice.placeholder = "Price of your product"
        putPrice.addEventListener("change", this.changeprice);
        Space.appendChild(putPrice);

        const putQuantity = this.ownerDocument.createElement("input");
        putQuantity.placeholder = "Quantity of your product"
        putQuantity.addEventListener("change", this.changequantity);
        Space.appendChild(putQuantity);

        const UploadButton = this.ownerDocument.createElement("button");
        UploadButton.innerHTML = "Upload";
        UploadButton.addEventListener("click", this.uploadform);
        Space.appendChild(UploadButton);

        const CardContainer = this.ownerDocument.createElement("div");
        CardContainer.classList.add("article-container");
    console.log(firebase)
    const theProducts = await firebase.getProducts();
    theProducts.forEach((productposts: any) => {
    const card = this.ownerDocument.createElement("app-card") as theCard;
    card.setAttribute(CardElement.prodImg, productposts.prodImg);
    card.setAttribute(CardElement.prodName, productposts.name);
    card.setAttribute(CardElement.stock, productposts.quantity);
    card.setAttribute(CardElement.price, productposts.price);

    CardContainer.appendChild(card);

        });
        this.shadowRoot?.appendChild(CardContainer);
        }
    }
}

customElements.define("app-container", AppContainer)
export default AppContainer;