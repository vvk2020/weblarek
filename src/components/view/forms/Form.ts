import { IForm } from "../../../types";
import { EVENTS, SELECTORS } from "../../../utils/constants";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

/** АБСТРАКТНАЯ ФОРМА */
export abstract class Form<T> extends Component<T> implements IForm {
  protected form: HTMLFormElement; // форма
  protected submitBtn: HTMLButtonElement; // кнопка отправки формы
  protected errorsEl: HTMLElement; // ошибка формы
  protected inputsList: NodeListOf<HTMLInputElement>; // список полей ввода данных формы

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.form = container as HTMLFormElement;
    this.submitBtn = container.querySelector(SELECTORS.forms.submitButton) as HTMLButtonElement;
    this.errorsEl = this.container.querySelector(SELECTORS.forms.errors) as HTMLElement;
    this.inputsList = this.container.querySelectorAll(SELECTORS.forms.inputs.selector) as NodeListOf<HTMLInputElement>; // <input>'ы формы
    // Назначение submit-обработчика формы
    if (this.form) {
      this.form.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault(); // отмена стандартной отправки форы
        // Генерирование события submit формы для брокера событий
        if (this.form.name in EVENTS.forms) {
          const formName = this.form.name as keyof typeof EVENTS.forms; // имя формы
          this.events.emit(EVENTS.forms[formName].submit);
        }
      });
    }
  }

  /** Вывод сообщения об ошибке валидации формы */
  set errors(text: string) {
    if (this.errorsEl) this.errorsEl.textContent = text;
  }

  /** Очистка полей ввода данных формы */
  public reset(): void {
    // Сброс полей ввода
    this.inputsList.forEach((inputElement) => {
      inputElement.value = '';
    });
    this.submitBtn.disabled = true; // блокировка кнопки
  }

  /** Блокировка(true) / разблокировка (false) submit-кнопки */
  set disableSubmitButton(disabled: boolean) {
    this.submitBtn.disabled = disabled;
  }
}
