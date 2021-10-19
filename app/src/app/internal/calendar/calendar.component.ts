import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { formatDate } from '@angular/common';
import deLocale from '@fullcalendar/core/locales/de';
import {
    NbCalendarRange,
    NbDateService,
    NbCalendarSize,
    NbCalendarViewMode,
    NbCalendarComponent,
    NbCalendarCell,
    NbCalendarDayCellComponent,
} from '@nebular/theme';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
    @ViewChild('calendarPreview') calendarPreviewRef!: NbCalendarComponent<any>;
    @ViewChild('calendarPreview') calendarPrev!: ElementRef<HTMLElement>;

    calendarTitle: string = '';
    selectedDate: Date = new Date();
    calSize: NbCalendarSize = NbCalendarSize.LARGE;

    range: NbCalendarRange<Date>;

    constructor(protected dateService: NbDateService<Date>) {
        let monday = this.getMonday(new Date());

        this.range = {
            start: monday,
            end: this.dateService.addDay(monday, 6),
        };
    }

    ngOnInit(): void {}

    calendarOptions: CalendarOptions = {
        locales: [deLocale],
        plugins: [],
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: '',
            center: '',
            right: '',
        },
        slotDuration: '00:45:00',
        slotMinTime: '07:00:00',
        slotMaxTime: '21:00:00',
        allDaySlot: false,
        expandRows: true,
        nowIndicator: true,
        firstDay: 1,
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short',
        },
        dayHeaderContent: (arg) => {
            let headerEL = document.createElement('span');

            if (arg.view.type == 'timeGridWeek') {
                headerEL.innerHTML = `<span class="date">${formatDate(
                    arg.date,
                    'dd',
                    'en'
                )}</span><br/>${formatDate(arg.date, 'EEEE', 'en')}`;
            } else {
                headerEL.innerHTML = `${formatDate(
                    arg.date,
                    'EEEE',
                    'en'
                )}<br/>`;
            }

            let arrayOfDomNodes = [headerEL];
            return { domNodes: arrayOfDomNodes };
        },
        slotLaneContent: (args) => {
            console.log(args);
        },
        datesSet: (data) => {
            console.log('datesSet: ', data);
            let currentView = data.view.type;

            // handle preview calendar
            this.selectedDate = data.start;
            if (this.calendarPreviewRef) {
                this.updateCalendarPreviewSelection({
                    start: this.selectedDate,
                });
            }

            switch (currentView) {
                case 'dayGridMonth':
                    let date = this.calendarComponent.getApi().getDate();

                    this.calendarTitle = formatDate(date, 'MMMM yyyy', 'en');
                    return;
                case 'timeGridWeek':
                    this.calendarTitle = `${formatDate(
                        data.start,
                        'MMM dd',
                        'en'
                    )} - ${formatDate(data.end, 'MMM dd', 'en')}, ${formatDate(
                        data.start,
                        'yyyy',
                        'en'
                    )}`;
                    return;
                default:
                    this.calendarTitle = '';
                    return;
            }
        },
    };

    calendarViewChange(event: any) {
        let val = event[0];
        this.calendarComponent.getApi().changeView(val);
    }

    calendarViewNext() {
        this.calendarComponent.getApi().next();
    }

    calendarViewPrev() {
        this.calendarComponent.getApi().prev();
    }

    calendarToday() {
        this.calendarComponent.getApi().today();
    }

    calendarPreviewChange(date: NbCalendarRange<any>) {
        this.updateCalendarPreviewSelection(date);
        this.calendarComponent.getApi().gotoDate(date.start);
    }

    updateCalendarPreviewSelection(date: NbCalendarRange<any>) {
        if (!date.end) {
            let monday = this.getMonday(date.start);
            this.range = {
                start: monday,
                end: this.dateService.addDay(monday, 6),
            };
            if (this.calendarPreviewRef) {
                this.calendarPreviewRef.visibleDate = this.range.end;
            }
        }
    }

    getMonday(d: Date) {
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
}
