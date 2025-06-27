import React, { useEffect, useState } from "react";
import type { JSX } from "react";

export interface Item {
	id: number;
	name: string;
	value: number;
}

const generateItems = (count = 100) =>
	Array.from({ length: count }, (_, i) => ({
		id: i,
		name: `Item ${i}`,
		value: Math.floor(Math.random() * 100),
	}));

const updateRandomItem = (prevItems: Item[]) => {
	const indexToUpdate = Math.floor(Math.random() * prevItems.length);
	const newItems = [...prevItems];
	newItems[indexToUpdate] = {
		...newItems[indexToUpdate],
		// Update the selected item with a new randomly generated value
		value: Math.floor(Math.random() * 100),
	};
	return newItems;
};

const MemoizedItem = React.memo(({ item }: { item: Item }) => {
	//Uncomment to simulate an error to test error boundary
	// if (item.value > 95) throw new Error(`Item ${item.id} crashed (value: ${item.value} > 95)`);

	return (
		<div style={{padding: "0.5rem", border: "1px solid black", margin: "0.5rem 0"}}>
			{item.name}: {item.value}
		</div>
	);
});

const ItemList = ({ renderItem }: { renderItem?: (item: Item) => JSX.Element }) => {
	const [items, setItems] = useState(generateItems());

	useEffect(() => {
		const interval = setInterval(() => {
			setItems(prevItems => updateRandomItem(prevItems));
		}, 400);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			{items.map(item => (
				renderItem 
					? React.cloneElement(renderItem(item), { key: item.id }) 
					: <MemoizedItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default ItemList;
