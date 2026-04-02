import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HUD } from './HUD';

describe('HUD', () => {
  it('renders branding and pause control', () => {
    render(<HUD />);
    expect(screen.getByText('IDLE')).toBeInTheDocument();
    expect(screen.getByText('PARK')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause game/i })).toBeInTheDocument();
  });
});
