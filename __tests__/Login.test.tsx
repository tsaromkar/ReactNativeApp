/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Login } from '@screens/Auth';

test('renders correctly', async () => {
    const { getAllByText } = render(<Login />);

    // There are multiple "Login" texts (button and link), so use getAllByText
    const loginTexts = getAllByText('Login');
    expect(loginTexts.length).toBeGreaterThan(0);
});
