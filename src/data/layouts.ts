import { LayoutOption } from '../types';

export const availableLayouts: LayoutOption[] = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    nameFa: 'مدرن تکنولوژی (طرح تصویر)',
    description: 'Exact 2-page layout from the reference photo: signature logo, pill skills, card experience, and 3x2 highlight matrix.',
    descriptionFa: 'چیدمان دو صفحه‌ای دقیق منطبق بر تصویر ارسال‌شده با تگ‌های مهارتی، کارت‌های پروژه و ماتریس برجستگی‌های مهندسی.',
    badge: 'Photo Match',
  },
  {
    id: 'dual-box-board',
    name: 'Dual-Box Canvas Board',
    nameFa: 'بورد دو صفحه‌ای با سایه شناور (Dual-Box)',
    description: 'Holds both pages inside a unified ambient background where each page becomes an elevated box with deep box-shadow.',
    descriptionFa: 'قالب دو صفحه‌ای روی پس‌زمینه یکپارچه استودیویی؛ هر صفحه به شکل یک جعبه شناور لوکس با باکس شادو و کادربندی برجسته.',
    badge: 'Dual Box Shadow',
  },
  {
    id: 'executive-sidebar',
    name: 'Executive Sidebar',
    nameFa: 'ستون کناری مدیریتی (سایدبار)',
    description: 'Distinct dual-column structure with an elegant contact & skills sidebar that flips seamlessly in Persian RTL.',
    descriptionFa: 'طراحی دو ستونه چشم‌نواز با نوار اختصاصی مشخصات و مهارت‌ها که در حالت فارسی به راست منتقل می‌شود.',
    badge: 'Dual-Column',
  },
  {
    id: 'classic-minimal',
    name: 'Classic Minimalist',
    nameFa: 'کلاسیک مینیمال',
    description: 'Clean typographic hierarchy with horizontal section dividers, high contrast, and optimal ATS parsing.',
    descriptionFa: 'ساختار خطی، مینیمال و استاندارد بین‌المللی با بیشترین خوانایی در سیستم‌های خودکار غربالگری رزومه (ATS).',
    badge: 'ATS-Friendly',
  },
  {
    id: 'compact-single',
    name: 'Compact Single-Page',
    nameFa: 'تک صفحه‌ای فشرده',
    description: 'Dense 1-page format fitting full-stack engineering summary, skills, experience, and top projects on a single A4 sheet.',
    descriptionFa: 'قالب اختصاصی یک‌صفحه‌ای با بهره‌وری بالا از فضا برای ارسال‌های سریع به شرکت‌هایی که رزومه تک‌صفحه‌ای می‌خواهند.',
    badge: '1-Page Fit',
  },
];
