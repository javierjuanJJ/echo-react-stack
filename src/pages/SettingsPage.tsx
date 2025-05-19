import {useUser} from '@clerk/clerk-react';
import {Separator} from '@/components/ui/separator';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {useEffect, useState} from 'react';
import {useToast} from '@/hooks/use-toast';
import {ThemeToggle} from '@/components/ThemeToggle';
import {useTheme} from '@/contexts/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {shouldSendNotifications} from "@/utils/notificationUtils.ts";

export default function SettingsPage() {
    const {user, isLoaded} = useUser();
    const {toast} = useToast();
    const {theme} = useTheme();
    const {t} = useTranslation();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    // Load notification preferences from localStorage
    useEffect(() => {
        const savedPushPref = localStorage.getItem('pushNotifications') === 'true';

        setPushNotifications(savedPushPref);
    }, []);

    const handleSaveSettings = () => {
        console.log('shouldSendNotifications(\'push\') ', shouldSendNotifications('push'))
        localStorage.setItem('pushNotifications', String(pushNotifications));

        toast({
            title: t('settings.saved'),
            description: t('settings.savedDesc')
        });
    };

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">{t('common.loading')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
            </div>

            <Separator/>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">{t('settings.profile')}</h3>
                    <p className="text-sm text-muted-foreground">
                        {t('settings.profileDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="fullName">
                            {t('settings.fullName')}
                        </label>
                        <Input
                            id="fullName"
                            value={user?.fullName || ''}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="email">
                            {t('settings.email')}
                        </label>
                        <Input
                            id="email"
                            value={user?.primaryEmailAddress?.emailAddress || ''}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="userId">
                            {t('settings.userId')}
                        </label>
                        <Input
                            id="userId"
                            value={user?.id || ''}
                            disabled
                            readOnly
                        />
                    </div>
                </div>

                <Separator/>

                <div>
                    <h3 className="text-lg font-medium">{t('settings.appearance')}</h3>
                    <p className="text-sm text-muted-foreground">
                        {t('settings.appearanceDesc')}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                                {t('settings.theme')}
                            </label>
                            <p className="text-xs text-muted-foreground">
                                {theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}
                            </p>
                        </div>
                        <ThemeToggle/>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                                {t('common.language')}
                            </label>
                            <p className="text-xs text-muted-foreground">
                                {t('settings.languageDesc')}
                            </p>
                        </div>
                        <LanguageSwitcher/>
                    </div>
                </div>

                <Separator/>

                <div>
                    <h3 className="text-lg font-medium">{t('settings.notifications')}</h3>
                    <p className="text-sm text-muted-foreground">
                        {t('settings.notificationsDesc')}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">
                                {t('settings.pushNotifications')}
                            </label>
                            <p className="text-xs text-muted-foreground">
                                {t('settings.pushNotificationsDesc')}
                            </p>
                        </div>
                        <Switch
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>
                        {t('common.save')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
