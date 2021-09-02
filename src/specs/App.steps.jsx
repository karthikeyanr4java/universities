import { defineFeature, loadFeature } from 'jest-cucumber';
import App from '../App';
const feature = loadFeature('src/specs/feature/App.feature');
import TestRenderer from 'react-test-renderer';
import React from 'react';

defineFeature(feature, test => {
    let testInstance;
    test('Render App Component', ({ given, when, then }) => {
        given('I have App component', () => {
            const testRenderer = TestRenderer.create(<App />);
            testInstance = testRenderer.root;
        });
        when('I click the URL', () => {

        });
        then('I should be able to render App without crash', () => {
            const divInstance = testInstance.findByProps({ id: 'header' });
            expect(divInstance.props.children).toBe('Universities Around Globe');
        });
    });
});