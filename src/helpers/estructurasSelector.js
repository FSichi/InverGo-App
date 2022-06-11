export const OptionEstructuras = [
    {
        label: "10.000",
        value: '1'
    },
    {
        label: "15.000",
        value: '2'
    },
    {
        label: "30.000",
        value: '3'
    },
    {
        label: "40.000",
        value: '4'
    }
];

export const Estructuras = [
    {
        id: '1',
        capitalEstructura: "10000",
        costoCuentas: "245",
        gananciaLiquida: "700",
        gananciaPasiva: "300",
    },
    {
        id: '2',
        capitalEstructura: "16300",
        costoCuentas: "539",
        gananciaLiquida: "1652.7",
        gananciaPasiva: "708.3",
    },
    {
        id: '3',
        capitalEstructura: "30300",
        costoCuentas: "1225",
        gananciaLiquida: "4200.7",
        gananciaPasiva: "1800.3",
    },
    {
        id: '4',
        capitalEstructura: "42800",
        costoCuentas: "1127",
        gananciaLiquida: "5513.2",
        gananciaPasiva: "2362.8",
    },

];

export const customStylesTareas = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'black' : 'black',
        padding: 12,
        minHeight: '44px',
        height: '44px',
        fontSize: 18,
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '44px',
        padding: '0 6px'
    }),
    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '44px',
    }),
}