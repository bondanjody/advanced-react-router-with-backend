import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    const err = useRouteError();

    let title = 'An error occured';
    let message = 'Something went wrong !';

    if (err.status === 500) {
        message = err.data.message;
    }

    if (err.status === 400) {
        title = 'Not Found'
        message = 'Could not find resource or page !';
    }
    return <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>
    
}

export default ErrorPage;