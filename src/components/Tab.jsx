"use client";
import React from 'react';

/**
 * Represents a tab in a tabbed interface.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {function} props.onClick - The function to be called when the tab is clicked.
 * @param {string} props.label - The label or text content of the tab.
 * @param {string} props.value - The value associated with the tab.
 * @param {boolean} [props.currentValue=false] - The current active value for highlighting the tab.
 * @returns {JSX.Element} - A button representing a tab.
 */
export const Tabs = ({ onClick, label, value, currentValue = false }) => {
  const active = value === currentValue;
  const activeClassName = 'dark:border-blue-500 dark:text-blue-500';
  const inActiveClassName = 'border-transparent text-gray-500 dark:text-gray-400';

  /**
   * Handles the click event for the tab.
   *
   * @param {string} tabValue - The value associated with the tab.
   */
  const handleClick = (tabValue) => {
    onClick(tabValue);
  };

  return (
    <button
      type='button'
      className='px-3 font-bold cursor-pointer'
      onClick={() => handleClick(value)}
    >
      <span
        className={`px-10 border-b-2 text-lg ${active ? activeClassName : inActiveClassName}`}
        style={{ paddingBottom: '23px' }}
      >
        {label}
      </span>
    </button>
  );
};
