import LottiePlayer from 'lottie-react';
import loadingLottie from '../../public/loader/loading_lottie.json';

export default function Loader() {
    return (
        <div className="relative flex items-center justify-center w-screen h-screen bg-black">
            <LottiePlayer
                animationData={loadingLottie}
                autoplay
                loop
                style={{ height: '40rem', width: '40rem' }}
            />
        </div>
    );
}
