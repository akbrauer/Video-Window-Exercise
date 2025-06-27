const ErrorPage = ({ error }: { error: Error }) => (
	<div style={{ color: "red", textAlign: "center", border: "1px solid red", padding: "2em" }}>
		<h2>Something went wrong.</h2>
		<p>It looks like an error occured somewhere within this component.</p>
		<pre>{error.message}</pre>
	</div>
);

export default ErrorPage;
