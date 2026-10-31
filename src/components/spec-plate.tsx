// The "technical plate": labelled fact fields, like a vehicle's type plate. Only verified facts go here.
export type PlateField = { label: string; value: string };

type Props = {
  fields: PlateField[];
  label: string;
  className?: string;
};

export function SpecPlate({ fields, label, className = "" }: Props) {
  return (
    <dl
      aria-label={label}
      className={`grid grid-cols-2 border-2 border-asphalt bg-plate lg:grid-cols-3 ${className}`}
    >
      {fields.map((field) => (
        <div
          key={field.label}
          className="-mb-px -mr-px min-w-0 border-r border-b border-rule px-4 py-3 sm:px-5 sm:py-4"
        >
          <dt className="text-sm text-graphite">{field.label}</dt>
          <dd className="mt-1 font-display text-lg font-bold italic font-wide sm:text-2xl">
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
