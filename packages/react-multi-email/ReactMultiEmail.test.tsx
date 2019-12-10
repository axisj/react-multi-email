import { shallow } from 'enzyme';
import ReactMultiEmail from './ReactMultiEmail';
import React from 'react';

const getLabel = (
  email: string,
  index: number,
  removeEmail: (index: number) => void,
) => {
  return <div key={index}>{email}</div>;
};

getLabel.displayName = 'getLabel';

describe('ReactMultiEmail Component Makes', () => {
  let component: any;
  it('Renders Correctly', () => {
    component = shallow(<ReactMultiEmail getLabel={getLabel} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('handles check', () => {
    expect(component.find('input').exists()).toBe(true);

    // onChange Check
    expect(component.find('input').props().onChange).toBeDefined();

    // onFocus Check
    expect(component.find('input').props().onFocus).toBeDefined();

    // onBlur Check
    expect(component.find('input').props().onBlur).toBeDefined();

    // onKeyDown Check
    expect(component.find('input').props().onKeyDown).toBeDefined();

    // onKeyUp Check
    expect(component.find('input').props().onKeyUp).toBeDefined();
  });
});

describe('handleNotKeyFunction Test', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<ReactMultiEmail getLabel={getLabel} />);
    wrapper
      .find('input')
      .simulate('change', { currentTarget: { value: '39ghwjd@naver.com' } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleTest', () => {
    it('handleOnChange Test', () => {
      expect(wrapper.find('input').prop('value')).toBe('39ghwjd@naver.com');
    });

    it('handleOnfocus Test', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.is('.focused')).toBe(true);
    });

    it('handleOnBlur Test', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.is('.focused')).toBe(true);

      wrapper
        .find('input')
        .simulate('blur', { currentTarget: { value: 'testBlur@naver.com' } });
      expect(wrapper.is('.focused')).toBe(false);
      expect(wrapper.find('input').prop('value')).toBe('');
    });
  });
});

describe('handleKeyFunction Test', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<ReactMultiEmail getLabel={getLabel} />);
  });

  describe('handleOnKeyUp Test', () => {
    it('KeyCode 13, 9  Keyup Test', () => {
      wrapper.find('input').simulate('keyup', {
        which: 13,
        currentTarget: { value: 'testKeyUp@naver.com' },
      });
      expect(wrapper.first().text()).toBe('testKeyUp@naver.com');
      wrapper.find('input').simulate('keyup', {
        which: 9,
        currentTarget: { value: 'testKeyUp2@naver.com' },
      });
      expect(wrapper.childAt(1).text()).toBe('testKeyUp2@naver.com');
    });

    it('other keyCode Keyup Test', () => {
      // excepted 13, 9
      wrapper.find('input').simulate('keyup', {
        which: 7,
        currentTarget: { value: 'testKeyUp3@naver.com' },
      });
      expect(wrapper.children('div').length).toBe(0);

      // re-add
      wrapper.find('input').simulate('keyup', {
        which: 9,
        currentTarget: { value: 'testKeyUp3@naver.com' },
      });
      expect(wrapper.childAt(0).text()).toBe('testKeyUp3@naver.com');
    });
  });

  describe('handleOnKeyDown Test', () => {
    it('KeyCode 13,9 Test', () => {
      const test = jest.fn();
      // wrapper.find('input').simulate('keydown', {which: 13, preventDefault : ()=> {} });
      wrapper
        .find('input')
        .props()
        .onKeyDown({ which: 13, preventDefault: test });
      expect(test).toHaveBeenCalled();
    });

    it('KeyCode 8 Test', () => {
      wrapper.find('input').simulate('keyup', {
        which: 9,
        currentTarget: { value: 'testKeyDown1@naver.com' },
      });
      expect(wrapper.childAt(0).text()).toBe('testKeyDown1@naver.com');
      wrapper
        .find('input')
        .simulate('keydown', { which: 8, currentTarget: {} });
      expect(wrapper.children('div').length).toBe(0);
      wrapper.find('input').simulate('keyup', {
        which: 9,
        currentTarget: { value: 'testKeyDown1@naver.com' },
      });
      wrapper
        .find('input')
        .simulate('keydown', { which: 10, currentTarget: {} });
      expect(wrapper.children('div').length).toBe(1);
    });
  });
});
