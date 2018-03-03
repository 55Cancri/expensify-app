import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Header from '../../components/Header.jsx'

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />)

  expect(wrapper).toMatchSnapshot()
})
