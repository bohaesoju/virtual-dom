import { Component } from './core/Component';

export class App extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `;
  }

  // 아이템 추가 메소드
  addItem = () => {
		const { items } = this.$state;
		this.setState({ items: [ ...items, `item${items.length + 1}` ] });
  }
  
  setEvent () {
    // setEvent 를 실행할 당시에는 this 가 App이 아닌 Component 를 가르키게 된다.
    // 그래서 setEvent 가 실행하는 시점에서 1프레임 이후에 이벤트를 등록/삭제 하도록 한다.
    const $addButton = this.$target.querySelector('button');
    $addButton.removeEventListener('click', this.addItem);
    $addButton.addEventListener('click', this.addItem);
  }
}

// 컴포넌트 생성
new App(document.querySelector('#root'));
