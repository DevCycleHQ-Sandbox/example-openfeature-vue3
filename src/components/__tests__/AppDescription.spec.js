import { describe, test, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils';

import AppDescription from '../AppDescription.vue';

describe('AppDescription', () => {
    test.each([
        'default',
        'step-1',
        'step-2',
        'step-3',
    ])('renders the app description correctly for value "%s"', async (variableValue) => {
        const mockGetStringValue = vi.fn().mockReturnValue(variableValue)
        const openFeatureClient = {
            getStringValue: mockGetStringValue,
        }
        const wrapper = mount(AppDescription, { props: { openFeatureClient }});
        await flushPromises();
        expect(wrapper.text()).toMatchSnapshot()
    });
});
