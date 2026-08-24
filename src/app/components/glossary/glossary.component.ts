import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

interface GlossaryTerm {
  term: string;
  definition: string;
  lesson: string;
}

interface ChapterGroup {
  chapter: string;
  terms: GlossaryTerm[];
}

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateDirective],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.css'
})
export class GlossaryComponent implements OnInit {
  searchQuery: string = '';
  
  allTerms: GlossaryTerm[] = [
    // الفصل الأول
    { term: 'قانون مور (Moore\'s Law)', definition: 'الملاحظة القائلة إن عدد الترانزستورات في الشريحة يتضاعف تقريباً كل عامين، مما يزيد سرعة الحوسبة ويقلل حجم الأجهزة.', lesson: '1-1 تكنولوجيا المعلومات والمجتمع' },
    { term: 'الحوسبة الطرفية (Edge Computing)', definition: 'معالجة البيانات على الجهاز نفسه أو بالقرب منه فوراً بدلاً من إرسالها إلى السحابة، مفيدة للقيادة الذاتية لتقليل زمن الاستجابة.', lesson: '1-1 تكنولوجيا المعلومات والمجتمع' },
    { term: 'الذكاء الاصطناعي (AI)', definition: 'مجال واسع يضم أنظمة حاسوبية تستطيع تنفيذ مهام تحاكي القدرات البشرية مثل التعلم والتنبؤ والتعرف.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'التعّلم الآلي (Machine Learning)', definition: 'فرع من الذكاء الاصطناعي تتعلم فيه النماذج أنماطاً من البيانات لإجراء تنبؤات دون برمجة قواعد صريحة.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'التعلم العميق (Deep Learning)', definition: 'أسلوب من أساليب التعلم الآلي يعتمد على شبكات عصبية متعددة الطبقات للتعلم من بيانات ضخمة معقدة كالصور والصوت.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'الشبكة العصبية (Neural Network)', definition: 'نموذج حاسوبي مستوحى بصورة مبسطة من فكرة ترابط العصبونات في الدماغ البشري.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'الذكاء الاصطناعي التوليدي (GenAI)', definition: 'ذكاء اصطناعي يستخدم التعلم العميق لتوليد بيانات جديدة تماماً مثل النصوص (ChatGPT) والصور.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'الهلوسة (Hallucination)', definition: 'إنتاج الذكاء الاصطناعي التوليدي لمعلومات تبدو مقنعة ومعقولة لكنها غير صحيحة أو غير مبنية على حقائق.', lesson: '1-2 كيف يعمل الذكاء الاصطناعي' },
    { term: 'التحيز الخوارزمي (Algorithmic Bias)', definition: 'نمط في مخرجات الذكاء الاصطناعي يؤدي إلى نتائج غير عادلة أو تمييزية، ينشأ غالباً بسبب بيانات تدريب متحيزة.', lesson: '1-4 القضايا الأخلاقية' },
    { term: 'الشفافية (Transparency)', definition: 'إظهار عملية اتخاذ القرار في الذكاء الاصطناعي بوضوح، ويتعلق بالذكاء الاصطناعي القابل للتفسير (XAI).', lesson: '1-4 القضايا الأخلاقية' },
    { term: 'المساءلة (Accountability)', definition: 'تحديد الجهات المسؤولة عن النظام وقراراته وآثاره وإمكان محاسبتها.', lesson: '1-4 القضايا الأخلاقية' },

    // الفصل الثاني
    { term: 'HTTPS', definition: 'نظام وبروتوكول لإجراء اتصالات الويب بأمان باستخدام التشفير واكتشاف التلاعب والشهادات الرقمية.', lesson: '2-1 تقنيات التشفير والمصادقة' },
    { term: 'التشفير المتماثل (Symmetric Encryption)', definition: 'استخدام مفتاح واحد لتبادل البيانات بسرعة وفعالية بعد إنشاء الاتصال الآمن.', lesson: '2-1 تقنيات التشفير والمصادقة' },
    { term: 'المصادقة الثنائية (2FA)', definition: 'استخدام عاملين مستقلين من فئتين مختلفتين (مثل كلمة المرور وهاتف محمول) لإثبات هوية المستخدم.', lesson: '2-1 تقنيات التشفير والمصادقة' },
    { term: 'جدار الحماية (Firewall)', definition: 'نظام يراقب حركة مرور الشبكة ويسمح أو يمنع الاتصال عند نقطة الدخول بناءً على قواعد محددة مسبقاً.', lesson: '2-2 تصميم أمن الشبكات' },
    { term: 'المنطقة المعزولة (DMZ)', definition: 'منطقة توضع فيها الخوادم المواجهة للجمهور مفصولة جزئياً عن الشبكة الداخلية الحساسة لحمايتها.', lesson: '2-2 تصميم أمن الشبكات' },
    { term: 'الدفاع في العمق (Defense in Depth)', definition: 'تكديس الإجراءات الأمنية في طبقات متعددة بحيث إذا فشلت طبقة تصدت الأخرى للهجوم.', lesson: '2-2 تصميم أمن الشبكات' },
    { term: 'نهج انعدام الثقة (Zero Trust)', definition: 'نهج أمني لا يمنح الثقة تلقائياً لأي مستخدم أو جهاز بمجرد دخوله الشبكة، بل يتحقق من كل عملية وصول.', lesson: '2-2 تصميم أمن الشبكات' },
    { term: 'الحادث الأمني (Security Incident)', definition: 'حدث يؤثر في سرية المعلومات أو سلامتها أو توافرها كالاختراقات وتسرب البيانات.', lesson: '2-3 الاستجابة للحوادث' },

    // الفصل الثالث
    { term: 'تطبيق الويب (Web App)', definition: 'تطبيق يُستخدم عادة عبر متصفح الويب (مثل متجر إلكتروني أو بريد) ويعتمد على واجهة أمامية وخلفية وقاعدة بيانات.', lesson: '3-1 البنية العامة لتطبيقات الويب' },
    { term: 'الواجهة الأمامية (Frontend)', definition: 'الشاشة التي يراها المستخدمون ويتفاعلون معها، وتُبنى بواسطة HTML و CSS و JavaScript.', lesson: '3-1 البنية العامة لتطبيقات الويب' },
    { term: 'الواجهة الخلفية (Backend)', definition: 'الجزء الذي يعمل على الخادم ويقوم بالمعالجة الخفية للطلبات وتطبيق قواعد العمل.', lesson: '3-1 البنية العامة لتطبيقات الويب' },
    { term: 'API (واجهة برمجة التطبيقات)', definition: 'مجموعة قواعد تتيح لبرمجيات مختلفة تبادل البيانات والاتصال ببعضها البعض.', lesson: '3-2 طرق اتصال تطبيقات الويب' },
    { term: 'JSON', definition: 'صيغة بيانات نصية بسيطة قابلة للقراءة تُستخدم لتبادل البيانات بين الخادم والعميل.', lesson: '3-2 طرق اتصال تطبيقات الويب' },
    { term: 'التصميم المتجاوب (Responsive Design)', definition: 'أسلوب تصميم يُضبط فيه التخطيط تلقائياً ليتكيف مع حجم شاشة المستخدم (كمبيوتر أو هاتف).', lesson: '3-3 تقنية الواجهة الأمامية' },

    // الفصل الرابع
    { term: 'اتجاه واحد / اتجاهين', definition: 'الاتجاه الواحد هو نقل المعلومة من المرسل للمتلقي فقط (كالتلفزيون). والاتجاهين يسمح بتفاعل المستخدمين ومشاركتهم.', lesson: '4-1 أنواع الوسائط' },
    { term: 'شخصية المستخدم (Persona)', definition: 'تمثيل لنمط من المستخدمين يستند إلى أهدافهم واحتياجاتهم لمساعدة فريق التصميم في التركيز على المستخدم.', lesson: '4-2 تصميم المعلومات' },
    { term: 'المخطط الهيكلي (Wireframe)', definition: 'مخطط أولي لتوزيع أماكن المعلومات والعناصر في صفحة الويب قبل إضافة أي ألوان أو تصميم بصري.', lesson: '4-2 تصميم المعلومات' },
    { term: 'مبادئ CRAP', definition: 'أربعة مبادئ بصرية لتنظيم التصميم: التباين (Contrast)، التكرار (Repetition)، المحاذاة (Alignment)، التقارب (Proximity).', lesson: '4-2 تصميم المعلومات' },
    { term: 'دورة PDCA', definition: 'دورة للتحسين المستمر تتكون من: خطّط (Plan)، نفّذ (Do)، تحقّق (Check)، تصرّف (Act).', lesson: '4-4 عملية التحسين التكراري' },
    { term: 'التقييم النوعي', definition: 'يستخدم الملاحظة والمقابلات لفهم "لماذا" تحدث مشكلات تجربة المستخدم.', lesson: '4-3 طرق التقييم' },
    { term: 'التقييم الكمي', definition: 'يستخدم الأرقام والبيانات العددية (مثل PV ومعدل الارتداد) لقياس "كم" التفاعل والنتائج.', lesson: '4-3 طرق التقييم' }
  ];

  filteredGroups: ChapterGroup[] = [];

  ngOnInit() {
    this.filterTerms();
  }

  filterTerms() {
    let filtered = this.allTerms;
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = this.allTerms.filter(t => 
        t.term.toLowerCase().includes(q) || 
        t.definition.toLowerCase().includes(q) ||
        t.lesson.toLowerCase().includes(q)
      );
    }

    // Group by lesson
    const grouped = filtered.reduce((acc, term) => {
      if (!acc[term.lesson]) {
        acc[term.lesson] = [];
      }
      acc[term.lesson].push(term);
      return acc;
    }, {} as any);

    this.filteredGroups = Object.keys(grouped).map(key => ({
      chapter: key,
      terms: grouped[key]
    })).sort((a, b) => a.chapter.localeCompare(b.chapter));
  }

}
