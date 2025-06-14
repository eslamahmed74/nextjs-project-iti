export default function InfoCard({ icon, title, value, color }) {
    const colorMap = {
        blue: 'from-blue-50 to-blue-100 text-blue-600',
        green: 'from-green-50 to-green-100 text-green-600',
        purple: 'from-purple-50 to-purple-100 text-purple-600',
        orange: 'from-orange-50 to-orange-100 text-orange-600',
    };

    return (
        <div className={`text-center p-4 bg-gradient-to-br ${colorMap[color]} rounded-xl`}>
            <div className="h-6 w-6 mx-auto mb-2">{icon}</div>
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-lg font-bold text-gray-900">{value}</div>
        </div>
    );
}