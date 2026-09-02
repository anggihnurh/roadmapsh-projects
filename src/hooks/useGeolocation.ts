import { useState } from 'react';


interface DetectGeolocationProps {
    onSuccess: (position: GeolocationPosition) => void | Promise<void>
    onError?: (errorMessage: string) => void
}

export function useGeolocation() {
    const [loading, setLoading] = useState(false);

    const detect = ({ onSuccess, onError }: DetectGeolocationProps) => {
        if (!navigator.geolocation) {
            onError?.('Geolocation is not supported by your browser.')
            return;
        }

        setLoading(true)

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                await onSuccess(position)
            } catch {
                onError?.('Error getCurrentPosition success handler.')
            }
            finally {
                setLoading(false)
            }
        }, (error) => {
            setLoading(false)
            onError?.(error.message)
        })
    }

    return { loading, detect };
}