import ItemList from "./ItemList";
import withErrorBoundary from "./ErrorBoundary";

const ErrorSafeList = withErrorBoundary(ItemList);

// An example of a custom render function to pass as a prop to ItemList

// import React from "react";
// import type { Item } from "./ItemList";
// const customRender = ({item}: {item: Item}) => {
// 	console.log(`Rendering item ${item.id}`);
// 	return <h2 style={{color: "slategrey"}}>{item.name}: {item.value}</h2>
// };
// const MemoizedCustomRender = React.memo(customRender);

function App() {
	return (
		<div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
			<ErrorSafeList />
			{/* <ErrorSafeList renderItem={(item) => <MemoizedCustomRender item={item}/>}/> */}
		</div>
	);
}

export default App;
