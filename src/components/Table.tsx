import React from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import styles from './Table.module.scss';
import { MdUnfoldMore, MdExpandLess, MdExpandMore } from 'react-icons/md';

type Props = {
    data: any[];
    columns: Column[];
    selectedRowId: string;
    onRowSelected?: (id: string) => void;
};

export function Table({ columns, data, selectedRowId, onRowSelected }: Props) {
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
        if (onRowSelected) {
            onRowSelected(id);
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
                                    className={column.isSorted ? styles.active : ''}
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
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={() => handleSelection(row.original.id)}
                                className={
                                    selectedRowId === row.original.id
                                        ? styles.selected
                                        : ''
                                }
                            >
                                {row.cells.map((cell: any) => {
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
