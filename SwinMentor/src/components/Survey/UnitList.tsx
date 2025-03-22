import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits";

export const UnitList: React.FC<{ selectedUnits: string[], onUnitSelect: (unitId: string) => void }> = ({ selectedUnits, onUnitSelect }) => {
    const { units, loading, error } = useAvailableUnits();
    if (loading) return <div>Loading units...</div>;
    if (error) return <div>Error loading units</div>;
    return (
        <div className="grid grid-cols-1 gap-4">
            {units.map((unit) => (
                <label key={unit.unit_id} className="flex items-center space-x-2 p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <input type="checkbox" value={unit.unit_id} checked={selectedUnits.includes(unit.unit_id)} onChange={() => onUnitSelect(unit.unit_id)} className="form-checkbox h-5 w-5 text-red-500" />
                    <span>{unit.unit_name}</span>
                </label>
            ))}
        </div>
    );
};
