import { Card, CardContent } from "../ui/card";

export default function UtilitiesCard() {
  return (
    <>
      <Card className="col-span-2 bg-gradient-to-br from-white to-slate-50 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-2">
        <CardContent className="flex flex-col items-start justify-center gap-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-2xl">Utilites</p>
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                $1,500
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
