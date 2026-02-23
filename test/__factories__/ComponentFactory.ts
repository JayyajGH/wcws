import React from 'react';
import { render, RenderResult } from '@testing-library/react';

export type ComponentFactoryOptions<P> = {
    props?: Partial<P>;
    attrs?: Record<string, any>; 
};

export abstract class ComponentFactory<P extends Record<string, any>> {
    protected abstract component: React.ComponentType<P>;
    protected defaultProps: P;

    constructor(defaultProps: P) {
        this.defaultProps = defaultProps;
    }

    private createProps(overrides: Partial<P> = {}): P {
        return {
            ...this.defaultProps,
            ...overrides,
        };
    }

    render(options: ComponentFactoryOptions<P> = {}): RenderResult {
        const props = this.createProps(options.props);

        return render(
            React.createElement(this.component, {
                ...props,
                ...options.attrs,
            })
        );
    }

    snapshot(options: ComponentFactoryOptions<P> = {}): DocumentFragment {
        const { asFragment } = this.render(options);
        return asFragment();
    }
    
    getProps(overrides: Partial<P> = {}): P {
        return this.createProps(overrides);
    }
}
