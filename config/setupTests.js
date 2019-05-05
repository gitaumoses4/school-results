import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

// snapshot serailizer for producing more human readable snapshots
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

Enzyme.configure({ adapter: new Adapter() });
// mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value;
  }
  removeItem(key) {
    delete this.store[key];
  }
}

class URLSearchParams {
  constructor(search){
    const params = search.split('&');
    this.map = {};
    params.forEach((param) => {
      const tokens = param.split('=');
      this.map[tokens[0]] = tokens[1];
    });
  }

  get(key){
    return this.map[key];
  }
}

global.localStorage = new LocalStorageMock;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.URLSearchParams = URLSearchParams;
jest.mock('react-router');

