import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const bigMoneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  notation: 'compact',
});

export const formatMoney = (amount: number): string => {
  if (amount >= 100_000) return bigMoneyFormatter.format(amount);
  return moneyFormatter.format(amount);
};

const numberFormatter = new Intl.NumberFormat('en-US');

export const formatNumber = (n: number): string => numberFormatter.format(Math.round(n));

export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export const lerp = (current: number, target: number, t: number): number => current + (target - current) * t;

export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
