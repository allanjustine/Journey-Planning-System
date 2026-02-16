import { ReactNode, useState } from 'react';
import { Activity } from '@/types/activity';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import fullDateFormat from '@/utils/full-date-format';
import { router } from '@inertiajs/react';
import { Spinner } from '@/components/ui/spinner';

export function AvtivityPopOver({
    activities,
    children,
}: {
    activities?: Activity[];
    children?: ReactNode;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleDeleteActivity = (id: number) => () => {
        router.delete(route('activities.destroy', id), {
            preserveScroll: true,
            replace: true,
            onBefore: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align="center">
                <PopoverHeader>
                    <PopoverTitle className="text-center">
                        ACTIVITIES
                    </PopoverTitle>
                    <PopoverDescription className="text-center">
                        Explore the activities available and their details.
                    </PopoverDescription>
                </PopoverHeader>
                <div className="mt-4">
                    {activities?.map((activity, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1 rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <span className="self-center text-xs font-thin italic underline">
                                {fullDateFormat(activity.created_at)}
                            </span>
                            <h4 className="text-md font-semibold break-all whitespace-break-spaces">
                                {activity.name}
                            </h4>
                            <p className="text-sm break-all whitespace-break-spaces">
                                {activity.description}
                            </p>
                            <Button
                                type="button"
                                size="sm"
                                disabled={isLoading}
                                variant={'destructive'}
                                className="cursor-pointer"
                                onClick={handleDeleteActivity(activity.id)}
                            >
                                {isLoading ? <Spinner /> : 'Delete'}
                            </Button>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
