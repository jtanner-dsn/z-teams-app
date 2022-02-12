import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsOfUse from '../components/TermsOfUse';
import Privacy from '../components/Privacy';
import App from '../App';

export default (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} >
                <Route path="privacy" element={<Privacy/>} />
                <Route path="termsofuse" element={<TermsOfUse/>} />
            </Route>
        </Routes>
    </BrowserRouter>
)