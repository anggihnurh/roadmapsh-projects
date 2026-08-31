import { useState } from 'react';
import toast from 'react-hot-toast';


interface DetectGeolocationProps {
    onSuccess: (position: GeolocationPosition) => void | Promise<void>
    onError?: (error: GeolocationPositionError) => void
}

export function useGeolocation() {
    const [loading, setLoading] = useState(false);

    const detect = ({ onSuccess, onError }: DetectGeolocationProps) => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.');
            setLoading(false);
            return;
        }

        setLoading(true)

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                await onSuccess(position)
            } finally {
                setLoading(false)
            }
        }, (error) => {
            setLoading(false)
            toast.error(error.message)
            onError?.(error)
        })
    }

    return { loading, detect };
}