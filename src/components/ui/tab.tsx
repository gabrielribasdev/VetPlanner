import React, { useState } from "react";
import { TabProps, TabsProps } from "../../types/types";
import { TabButton, TabContent, TabsBody, TabsContainer, TabsHeader } from "../../styles/tabStyles";


const Tab: React.FC<TabProps> = ({ label, children }) => {
    return <div className="tab-content">{children}</div>;
};


const Tabs: React.FC<TabsProps> = ({ children, selectedTab, onChange }) => {
    const [internalActiveTab, setInternalActiveTab] = useState(0);


    const activeTab = selectedTab ?? internalActiveTab;


    const handleTabClick = (index: number) => {
        if (onChange) {
            onChange(index);
        } else {
            setInternalActiveTab(index);
        }
    };


    return (
        <TabsContainer>
            <TabsHeader>
                {children.map((child: any, index: any) => (
                    <TabButton
                        key={index}
                        isActive={activeTab === index}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </TabButton>
                ))}
            </TabsHeader>
            <TabsBody>
                {children.map((child: any, index: any) => (
                    <TabContent
                        key={index}
                        isVisible={activeTab === index}
                    >
                        {child}
                    </TabContent>
                ))}
            </TabsBody>
        </TabsContainer>
    );
};


export { Tabs, Tab };