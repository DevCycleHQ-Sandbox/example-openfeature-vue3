import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils';

import { getDevCycleClient } from '../../devcycle.js';
import AppDescription from '../AppDescription.vue';

vi.mock('../../devcycle.js')

describe('AppDescription', () => {
    let mockGetDevCycleClient
    beforeEach(() => {
        mockGetDevCycleClient = vi.mocked(getDevCycleClient)
    })

    test.each([
        'default',
        'step-1',
        'step-2',
        'step-3',
    ])('renders the app description correctly for value "%s"', async (variableValue) => {
        mockGetDevCycleClient.mockReturnValue({
            variableValue: vi.fn().mockReturnValue(variableValue),
            subscribe: vi.fn()
        })
        const wrapper = mount(AppDescription);
        await flushPromises();
        expect(wrapper.text()).toMatchSnapshot()
    });
});
