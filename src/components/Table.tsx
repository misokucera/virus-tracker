import React from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import styles from './Table.module.scss';
import { MdUnfoldMore, MdExpandLess, MdExpandMore } from 'react-icons/md';

type Props = {
    onCountrySelect?: (id: string) => void
    columns: Column[];
    data: any[];
};

export function Table({ columns, data, onCountrySelect }: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    );

    const handleSelection = (id: string): void => {
        if (onCountrySelect) {
            onCountrySelect(id);
        }
    };

    return (
        <>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    className={column.isSorted && styles.active}
                                >
                                    <div className={styles.title}>
                                        {column.render('header')}
                                        <span className={styles.icon}>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <MdExpandMore />
                                                ) : (
                                                    <MdExpandLess />
                                                )
                                            ) : (
                                                <MdUnfoldMore />
                                            )}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>{' '}
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} onClick={() => handleSelection(row.id)}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
