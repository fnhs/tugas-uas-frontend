import { Outlet } from 'react-router';
import { Navbar, Footer } from '@/components/organisms';

const LayoutAdmin = () => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className='container mx-auto'>
                <Navbar />
            </div>
            <div className="flex-1 container mx-auto py-6 px-4">
                <Outlet />
            </div>
            <div className='container mx-auto'>
                <Footer />
            </div>
        </div>
    );
};

export default LayoutAdmin;