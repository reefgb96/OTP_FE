// React imports
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

// Custom imports
import {AppContent} from "./ui/components/AppContent";
import {LoaderPage} from "./ui/components/Loader"
import {PageWrapper} from "./AppWrappers"


const loading = <LoaderPage/>
const queryClient = new QueryClient();


const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PageWrapper>
                <Router>
                    <React.Suspense fallback={loading}>
                        <AppContent/>
                    </React.Suspense>
                </Router>
            </PageWrapper>
        </QueryClientProvider>
    );
    
}

export default App;
