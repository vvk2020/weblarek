import { IGallery } from "../../types";
import { Component } from "../base/Component";

export class Gallery extends Component<IGallery> {

  constructor(protected container: HTMLElement) {
    super(container);
  }

  set gallery(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}