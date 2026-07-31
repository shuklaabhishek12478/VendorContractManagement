import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
    ChartComponent,
    NgApexchartsModule,

    ApexAxisChartSeries,
    ApexNonAxisChartSeries,

    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ApexStroke,
    ApexLegend,
    ApexResponsive,
    ApexPlotOptions,
    ApexFill,
    ApexTooltip,
    ApexDataLabels,
    ApexGrid,
    ApexMarkers,
    ApexTheme,
    ApexTitleSubtitle
} from 'ng-apexcharts';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ReportChartType =
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut';

export interface ReportChartData {

    label: string;

    value: number;

}

@Component({

    selector: 'app-report-chart',

    standalone: true,

    imports: [

        CommonModule,

        NgApexchartsModule,

        MatCardModule,

        MatButtonModule,

        MatIconModule,

        MatTooltipModule,

        MatProgressSpinnerModule

    ],

    templateUrl: './report-chart.html',

    styleUrls: ['./report-chart.scss'],

    changeDetection: ChangeDetectionStrategy.OnPush

})

export class ReportChartComponent implements OnChanges {

    @ViewChild('chart')
    chart?: ChartComponent;

    //====================================================
    // INPUTS
    //====================================================

    @Input()
    title = '';

    @Input()
    subtitle = '';

    @Input()
    loading = false;

    @Input()
    type: ReportChartType = 'bar';

    @Input()
    height = 360;

    @Input()
    showToolbar = true;

    @Input()
    showLegend = true;

    @Input()
    showDataLabels = false;

    @Input()
    data: ReportChartData[] = [];

    //====================================================
    // OUTPUTS
    //====================================================

    @Output()
    refreshRequested =
        new EventEmitter<void>();

    //====================================================
    // CHART OPTIONS
    //====================================================

   chartOptions: ApexChart = {

    type: 'bar',

    height: 360

};

    chartSeries:
        ApexAxisChartSeries |
        ApexNonAxisChartSeries = [];

    xaxis: ApexXAxis = {};

    yaxis: ApexYAxis = {};

    stroke: ApexStroke = {};

    legend: ApexLegend = {};

    fill: ApexFill = {};

    tooltip: ApexTooltip = {};

    plotOptions: ApexPlotOptions = {};

    dataLabels: ApexDataLabels = {};

    responsive: ApexResponsive[] = [];

    grid: ApexGrid = {};

    markers: ApexMarkers = {};

    theme: ApexTheme = {};

    titleOptions: ApexTitleSubtitle = {};

    labels: string[] = [];

    colors: string[] = [

        '#2563EB',
        '#3B82F6',
        '#06B6D4',
        '#14B8A6',
        '#10B981',
        '#84CC16',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899'

    ];

    //====================================================
    // LIFECYCLE
    //====================================================

    ngOnChanges(
        changes: SimpleChanges
    ): void {

        this.initializeChart();

    }

    get hasData(): boolean {

        return this.data.length > 0;

    }

    get isPieChart(): boolean {

        return this.type === 'pie'
            || this.type === 'donut';

    }

    //====================================================
    // BUILD
    //====================================================

    private initializeChart(): void {

        if (!this.hasData) {

            this.chartSeries = [];
            this.labels = [];

            return;

        }

        this.buildCommonOptions();

        if (this.isPieChart) {

            this.buildPieChart();

        }
        else {

            this.buildAxisChart();

        }

    }

    /*
       buildCommonOptions()

       buildAxisChart()

       buildPieChart()

       refresh()

       downloadPNG()

       downloadSVG()

       toggleFullscreen()

       ==> Next Part
    */



//====================================================
// COMMON OPTIONS
//====================================================

private buildCommonOptions(): void {

    this.chartOptions = {

        type: this.type as any,

        height: this.height,

        background: 'transparent',

        toolbar: {

            show: this.showToolbar

        },

        zoom: {

            enabled: false

        },

       animations: {
    enabled: true,
    speed: 700,
    animateGradually: {
        enabled: true,
        delay: 150
    },
    dynamicAnimation: {
        enabled: true,
        speed: 350
    }
},

        fontFamily: 'Inter, Roboto, Arial, sans-serif'

    };

    this.legend = {

        show: this.showLegend,

        position: 'bottom',

        horizontalAlign: 'center',

        fontSize: '13px',

        labels: {

            colors: '#475569'

        }

    };

    this.grid = {

        borderColor: '#E2E8F0',

        strokeDashArray: 4,

        padding: {

            left: 10,

            right: 10,

            top: 8,

            bottom: 8

        }

    };

    this.stroke = {

        curve: 'smooth',

        width:
            this.type === 'bar'
                ? 0
                : 3

    };

    this.fill = {

        opacity: this.type === 'area'
            ? 0.35
            : 1

    };

    this.tooltip = {

        enabled: true,

        shared: true,

        intersect: false,

        theme: 'light',

        y: {

            formatter: (value: number) =>

                value.toLocaleString()

        }

    };

    this.dataLabels = {

        enabled: this.showDataLabels

    };

    this.markers = {

        size:

            this.type === 'line'
            || this.type === 'area'

                ? 4

                : 0,

        hover: {

            size: 6

        }

    };

    this.theme = {

        monochrome: {

            enabled: false

        }

    };

    this.responsive = [

        {

            breakpoint: 1024,

            options: {

                chart: {

                    height: 320

                }

            }

        },

        {

            breakpoint: 768,

            options: {

                chart: {

                    height: 280

                },

                legend: {

                    position: 'bottom'

                }

            }

        }

    ];

}

//====================================================
// BAR / LINE / AREA
//====================================================

private buildAxisChart(): void {

    this.labels =

        this.data.map(x => x.label);

    this.chartSeries = [

        {

            name: this.title,

            data:

                this.data.map(x => x.value)

        }

    ];

    this.xaxis = {

        categories: this.labels,

        labels: {

            rotate: -35,

            style: {

                colors: '#64748B',

                fontSize: '12px'

            }

        },

        axisBorder: {

            show: true

        },

        axisTicks: {

            show: true

        }

    };

    this.yaxis = {

        labels: {

            formatter: (value: number) =>

                value.toLocaleString(),

            style: {

                colors: '#64748B'

            }

        }

    };

    this.plotOptions = {

        bar: {

            borderRadius: 8,

            columnWidth: '48%',

            distributed: false,

            dataLabels: {

                position: 'top'

            }

        }

    };

}

//====================================================
// PIE / DONUT
//====================================================

private buildPieChart(): void {

    this.labels =

        this.data.map(x => x.label);

    this.chartSeries =

        this.data.map(x => x.value);

    this.chartOptions = {

        ...this.chartOptions,

        type: this.type as any

    };

}

//====================================================
// ACTIONS
//====================================================

refresh(): void {

    this.refreshRequested.emit();

}

//====================================================
// EXPORT PNG
//====================================================

async downloadPNG(): Promise<void> {

    if (!this.chart) {

        return;

    }

    try {

        await this.chart.dataURI();

    }
    catch (error) {

        console.error(
            'Unable to export PNG.',
            error
        );

    }

}

//====================================================
// EXPORT SVG
//====================================================

async downloadSVG(): Promise<void> {

    if (!this.chart) {

        return;

    }

    try {

        await this.chart.dataURI();

    }
    catch (error) {

        console.error(
            'Unable to export SVG.',
            error
        );

    }

}

//====================================================
// FULLSCREEN
//====================================================

toggleFullscreen(): void {

    const card = document.querySelector(
        '.chart-card'
    ) as HTMLElement | null;

    if (!card) {

        return;

    }

    if (!document.fullscreenElement) {

        card.requestFullscreen()
            .catch(console.error);

        return;

    }

    document.exitFullscreen();

}

//====================================================
// FORMATTERS
//====================================================

formatCurrency(
    value: number
): string {

    return new Intl.NumberFormat(

        'en-IN',

        {

            style: 'currency',

            currency: 'INR',

            maximumFractionDigits: 0

        }

    ).format(value);

}

formatNumber(
    value: number
): string {

    return new Intl.NumberFormat(
        'en-IN'
    ).format(value);

}

//====================================================
// HELPERS
//====================================================

trackByLabel(
    index: number,
    item: ReportChartData
): string {

    return item.label;

}

get total(): number {

    return this.data.reduce(

        (sum, x) => sum + x.value,

        0

    );

}

get maxValue(): number {

    if (!this.data.length) {

        return 0;

    }

    return Math.max(

        ...this.data.map(
            x => x.value
        )

    );

}

get minValue(): number {

    if (!this.data.length) {

        return 0;

    }

    return Math.min(

        ...this.data.map(
            x => x.value
        )

    );

}
}