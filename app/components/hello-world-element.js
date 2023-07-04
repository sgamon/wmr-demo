import {LitElement, html} from 'lit-element';

class HelloWorldElement extends LitElement {
  render() {
    return html`hello world`
  }
}

customElements.define('hello-world-element', HelloWorldElement)

export default HelloWorldElement
