import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Privacy from '../components/Privacy';
import TermsOfUse from '../components/TermsOfUse';
import Configure from '../pages/configure';
import RiskRegister from '../pages/RiskRegister';

export default (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} >
                <Route path="privacy" element={<Privacy/>} />
                <Route path="termsofuse" element={<TermsOfUse/>} />
                <Route path="configure" element={<Configure/>} />
                <Route path="riskregister" element={<RiskRegister/>} />
            </Route>
        </Routes>
    </BrowserRouter>
)