import type {ReactNode} from "react";

function Banner({bannerType, children}: { bannerType: 'happy' | 'sad', children: ReactNode }) {
    return (
        <div className={`${bannerType} banner`}>
            {children}
        </div>
    );
}

export default Banner;
