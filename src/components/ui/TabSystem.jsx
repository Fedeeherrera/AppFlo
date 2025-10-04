import TabButton from './TabButton'

const TabSystem = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`flex justify-center ${containerClassName}`}>
      <div className={`flex gap-3 ${className}`}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            icon={tab.icon}
            label={tab.label}
            color={tab.color}
          />
        ))}
      </div>
    </div>
  )
}

export default TabSystem