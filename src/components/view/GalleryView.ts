import { IGalleryData } from "../../types";
import { Component } from "../base/Component";

/** ПРЕДСТАВЛЕНИЕ ГАЛЕРЕИ КАРТОЧЕК ТОВАРОВ */
export class GalleryView extends Component<IGalleryData> {

  constructor(protected container: HTMLElement) {
    super(container);
  }

  set cards(cards: HTMLElement[]) {
    this.container.replaceChildren(...cards);
  }
}