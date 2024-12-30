import { Table } from '@mantine/core';

const FixedPrice = () => {
  const data = [
    { route: 'Raunheim', price: '21€' },
    { route: 'Rüsselsheim a. M.', price: '25€' },
    { route: 'Rüsselsheim/Königstädten', price: '27€' },
    { route: 'Bauschheim', price: '30€' },
    { route: 'Bischofsheim', price: '30€' },
    { route: 'Trebur', price: '30€' },
    { route: 'Astheim', price: '30€' },
    { route: 'Nauheim', price: '30€' },
    { route: 'Groß Gerau', price: '35€' },
    { route: 'Hochheim', price: '33€' },
    { route: 'Flörsheim a. M.', price: '25€' },
    { route: 'Flörsheim/Wicker', price: '28€' },
    { route: 'Flörsheim/Weilbach', price: '38€' },
    { route: 'Massenheim', price: '33€' },
    { route: 'Wallerstädten', price: '35€' },
    { route: 'Geinsheim', price: '40€' },
    { route: 'Hessenau', price: '40€' },
    { route: 'Gustavsburg', price: '33€' },
    { route: 'Ginsheim', price: '35€' }
  ];
  const rows = data.map((element,index)=>{
    return(
        <Table.Tr key={index}>
            <Table.Td>{element.route}</Table.Td>
            <Table.Td>{element.price}</Table.Td>
        </Table.Tr>
    )
  })
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Route</Table.Th>
          <Table.Th>Price</Table.Th>
        </Table.Tr>
      </Table.Thead>
        <Table.Tbody>
            {rows}
        </Table.Tbody>
    </Table>
  );
}

export default FixedPrice;
