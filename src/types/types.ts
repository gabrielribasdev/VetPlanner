export interface TabsProps {
    children: React.ReactElement[];
    selectedTab?: number;
    onChange?: (tabIndex: number) => void;
}


export interface TabProps {
    label: string;
    children: React.ReactNode;
}
