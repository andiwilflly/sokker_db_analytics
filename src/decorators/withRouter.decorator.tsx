import { useRouter } from "next/router";

const withRouter = (Component: React.ComponentType) => {
	return function WrappedComponent(props: any) {
		const router = useRouter();
		return <Component {...props} router={router} />;
	};
};

export default withRouter;
