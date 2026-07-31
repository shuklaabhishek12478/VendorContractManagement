import { Injectable } from '@angular/core';

import { ReportChartData } from '../../features/reports/Components/report-chart/report-chart';

@Injectable({
    providedIn: 'root'
})
export class ReportChartBuilderService {

    buildMonthlySpendChart(
        data: { month: string; spend: number }[]
    ): ReportChartData[] {

        return data.map(x => ({
            label: x.month,
            value: x.spend
        }));
    }

    buildVendorSpendChart(
        data: { vendorName: string; spend: number }[]
    ): ReportChartData[] {

        return data.map(x => ({
            label: x.vendorName,
            value: x.spend
        }));
    }

    buildDepartmentSpendChart(
        data: { department: string; spend: number }[]
    ): ReportChartData[] {

        return data.map(x => ({
            label: x.department,
            value: x.spend
        }));
    }

    buildCategorySpendChart(
        data: { category: string; spend: number }[]
    ): ReportChartData[] {

        return data.map(x => ({
            label: x.category,
            value: x.spend
        }));
    }

    buildStatusChart<T>(
        items: T[],
        selector: (item: T) => string
    ): ReportChartData[] {

        const map = new Map<string, number>();

        items.forEach(item => {

            const key = selector(item);

            map.set(
                key,
                (map.get(key) ?? 0) + 1
            );

        });

        return Array
            .from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([label, value]) => ({
                label,
                value
            }));
    }
}