(() => {
  'use strict';
  const root = window.STUDYFORGE_BOOKS;
  if (!root || !Array.isArray(root.subjects)) return;

  const unit = (subjectId, unitId) => root.subjects.find(s => s.id === subjectId)?.units?.find(u => u.id === unitId);
  const addTopics = (u, items) => {
    if (!u) return;
    u.topicQA = u.topicQA || [];
    items.forEach(item => {
      if (!u.topicQA.some(x => x.q === item.q)) u.topicQA.push(item);
    });
  };
  const addExercise = (u, items) => {
    if (!u) return;
    u.exercise = u.exercise || [];
    items.forEach(item => {
      if (!u.exercise.some(x => x.q === item.q && x.group === item.group)) u.exercise.push(item);
    });
  };

  const maths = unit('maths','m2');
  addTopics(maths,[
    {q:'What is the completing square method?',a:'It is a method of solving a quadratic equation by making the x² and x terms into a perfect square. For x² + bx, add (b/2)² to both sides, write the left side as a square, take square roots with ±, and solve for x.'},
    {q:'Solve x² + 6x = 16 by completing square method.',a:'x² + 6x + 9 = 16 + 9 ⇒ (x + 3)² = 25 ⇒ x + 3 = ±5. Therefore x = 2 or x = −8.'},
    {q:'State the quadratic formula.',a:'For ax² + bx + c = 0, where a ≠ 0, the roots are x = [−b ± √(b² − 4ac)] / 2a.'},
    {q:'What is the discriminant of a quadratic equation?',a:'The discriminant is D = b² − 4ac. If D > 0, there are two different real roots; if D = 0, there are equal real roots; if D < 0, there are no real roots.'},
    {q:'How are the roots of a quadratic equation found graphically?',a:'Draw the graph y = ax² + bx + c. The x-coordinates of the points where the graph intersects the x-axis are the roots of ax² + bx + c = 0.'},
    {q:'How do you find the intercepts of a linear function with the coordinate axes?',a:'For the x-axis intercept, put y = 0 and solve for x, giving the point (x,0). For the y-axis intercept, put x = 0 and find y, giving the point (0,y).'}
  ]);
  addExercise(maths,[
    {group:'Paper Ready Practice',q:'Solve 2x² + x − 6 = 0 by quadratic formula.',a:'a=2, b=1, c=−6. x=[−1±√(1−4(2)(−6))]/4=[−1±√49]/4=[−1±7]/4. Hence x=3/2 or x=−2.'},
    {group:'Paper Ready Practice',q:'Solve 5x² − 18 = 2x by completing square method.',a:'5x²−2x=18 ⇒ x²−(2/5)x=18/5. Add (−1/5)²=1/25 to both sides: (x−1/5)²=91/25. Therefore x−1/5=±√91/5 and x=(1±√91)/5.'},
    {group:'Paper Ready Practice',q:'For y = 4x − 8, find the x-axis and y-axis intersection points.',a:'For x-axis, y=0: 0=4x−8 ⇒ x=2, so (2,0). For y-axis, x=0: y=−8, so (0,−8).'}
  ]);

  const computer = unit('computer','cs1');
  addTopics(computer,[
    {q:'Define primary memory (RAM).',a:'RAM (Random Access Memory) is the computer’s main temporary working memory. It stores data and instructions currently needed by the CPU, and its contents are erased when the computer is turned off.'},
    {q:'What is virtual memory and when is it used?',a:'When RAM becomes full, the operating system uses part of the storage drive such as an HDD, SSD or NVMe as temporary extra memory. This is called virtual memory.'},
    {q:'Why is virtual memory slower than RAM?',a:'Virtual memory uses storage drives, whose data-transfer speed and access time are slower than RAM. Therefore heavy use of virtual memory can reduce system performance.'},
    {q:'What is the difference between a process and a thread?',a:'A process is an independent program currently being executed and has its own memory space and resources. A thread is the smallest unit of execution inside a process; multiple threads of the same process share its memory and resources.'},
    {q:'What is multithreading?',a:'Multithreading is an operating-system technique in which one process is divided into multiple threads so different tasks can progress during the same period while sharing the process resources.'},
    {q:'State two benefits of multithreading.',a:'Multithreading can improve performance and responsiveness, and it uses resources efficiently because threads share the same memory and resources of their parent process.'},
    {q:'Define a system call with an example.',a:'A system call is a request made by a program to the operating system to perform a task that the program cannot safely do directly. For example, when a text editor saves a file, it uses a system call to ask the OS to write the data to the storage drive.'},
    {q:'Name four common types of system calls in this unit.',a:'open — opens a file; read — retrieves data; write — sends data to a file or output device; fork — creates a new process by duplicating an existing one.'}
  ]);
  addExercise(computer,[
    {group:'Short Question · Paper Ready',q:'Why is virtual memory slower than RAM?',a:'Virtual memory uses HDD/SSD/NVMe storage as temporary memory when RAM is full. Storage devices have slower access and data-transfer speeds than RAM, so virtual memory reduces performance.'},
    {group:'Short Question · Paper Ready',q:'Define a system call.',a:'A system call is a request by a program to the operating system to perform a specific task that the program cannot do directly, such as opening, reading, writing or saving a file.'},
    {group:'Long Question · Paper Ready',q:'Differentiate between RAM and virtual memory, and explain how multithreading improves performance.',a:'RAM is the fast primary working memory used directly during program execution; it is temporary and loses its contents when power is off. Virtual memory is part of HDD/SSD/NVMe storage used as extra temporary memory when RAM is full, so it is slower. Multithreading divides one process into smaller threads that can handle different tasks during the same period while sharing memory and resources. This improves responsiveness, performance and resource efficiency.'}
  ]);

  const pak = unit('pakstudies','ps1');
  addTopics(pak,[
    {q:'چودھری رحمت علی نے 1933ء میں کیا اہم کام کیا؟',a:'چودھری رحمت علی نے 28 جنوری 1933ء کو کیمبرج میں “Now or Never” کے نام سے ایک پمفلٹ شائع کیا۔ اس میں انہوں نے برصغیر کے مسلمانوں کے لیے الگ وطن کا تصور پیش کیا اور “پاکستان” کا نام استعمال کیا۔'},
    {q:'ہندوستان میں مسلمانوں کی معاشی محرومی کی دو اہم وجوہات بیان کریں۔',a:'برطانوی تجارتی پالیسیوں نے مقامی مسلمان تاجروں اور صنعتوں کو نقصان پہنچایا۔ اس کے علاوہ مسلمانوں کو سرکاری ملازمتوں اور کئی معاشی مواقع سے دور رکھا گیا، جبکہ زرعی پالیسیوں نے بھی ان کی مالی حالت کمزور کی۔'},
    {q:'قائد اعظم محمد علی جناح نے نظریۂ پاکستان کو عملی سیاسی جدوجہد میں کیسے بدلا؟',a:'قائد اعظم نے واضح کیا کہ ہندو اور مسلمان مذہب، تہذیب، معاشرت اور طرزِ زندگی کے اعتبار سے دو الگ قومیں ہیں۔ انہوں نے مسلمانوں کو سیاسی طور پر منظم کیا اور 23 مارچ 1940ء کی قراردادِ لاہور کے بعد الگ مسلم وطن کے مطالبے کو واضح اور مضبوط سیاسی تحریک بنا دیا۔'}
  ]);
  addExercise(pak,[
    {group:'مختصر جواب · Paper Ready',q:'“Now or Never” کی اہمیت کیا تھی؟',a:'اس پمفلٹ نے برصغیر کے مسلمانوں کے لیے الگ وطن کے تصور کو نمایاں کیا اور “پاکستان” کے نام کو سیاسی فکر میں واضح طور پر پیش کیا۔'},
    {group:'مختصر جواب · Paper Ready',q:'مسلمانوں کی معاشی محرومی کی دو وجوہات لکھیں۔',a:'برطانوی تجارتی پالیسیوں سے مقامی مسلم کاروبار کو نقصان پہنچا اور مسلمانوں کو سرکاری ملازمتوں و معاشی مواقع سے دور رکھا گیا۔'}
  ]);

  const tarjuma = unit('tarjuma','t2');
  addTopics(tarjuma,[
    {q:'سورۃ الاعراف کا تعارف لکھیں۔',a:'سورۃ الاعراف ایک مکی سورت ہے۔ اس میں 206 آیات اور 24 رکوع ہیں۔ “الاعراف” جنت اور جہنم کے درمیان ایک بلند جگہ کو کہا جاتا ہے۔'},
    {q:'سورۃ الاعراف کے مرکزی مضامین کیا ہیں؟',a:'اس سورت کے مرکزی مضامین توحید، رسالت، آخرت، قرآن مجید کی عظمت، انبیاء کی اطاعت، شیطان کے فریب سے بچنا اور انسان کی اخلاقی و عملی رہنمائی ہیں۔'},
    {q:'حضرت آدمؑ اور ابلیس کے واقعے سے کیا سبق ملتا ہے؟',a:'ابلیس نے تکبر کی وجہ سے حضرت آدمؑ کو سجدہ کرنے سے انکار کیا۔ اس سے سبق ملتا ہے کہ تکبر انسان کو اللہ کی نافرمانی تک لے جاتا ہے اور شیطان انسان کا دشمن ہے، اس لیے اس کے بہکاوے سے بچنا چاہیے۔'},
    {q:'حضرت آدمؑ اور حضرت حواؑ نے غلطی کے بعد کیا کیا؟',a:'انہوں نے اپنی غلطی تسلیم کی اور اللہ تعالیٰ سے معافی و رحمت کی دعا کی۔ اس سے سبق ملتا ہے کہ انسان سے غلطی ہو جائے تو اسے اپنی غلطی مان کر سچی توبہ اور استغفار کرنا چاہیے۔'},
    {q:'سورۃ الاعراف میں لباس کے بارے میں کیا تعلیم دی گئی ہے؟',a:'اللہ تعالیٰ نے لباس کو جسم ڈھانپنے اور زینت کے لیے نعمت قرار دیا ہے۔ ساتھ ہی تنبیہ کی گئی ہے کہ شیطان انسان کو اسی طرح فتنے میں نہ ڈالے جیسے اس نے حضرت آدمؑ اور حضرت حواؑ کو بہکایا تھا۔'},
    {q:'سورۃ الاعراف کھانے پینے اور اسراف کے بارے میں کیا تعلیم دیتی ہے؟',a:'انسان کو کھانے اور پینے کی اجازت ہے، لیکن اسراف یعنی حد سے بڑھنے، غیر ضروری خرچ اور نعمت کو ضائع کرنے سے منع کیا گیا ہے۔'},
    {q:'حلال زینت اور پاک رزق کے بارے میں سورۃ الاعراف کی تعلیم کیا ہے؟',a:'اللہ تعالیٰ کی پیدا کی ہوئی اچھی زینت اور پاک رزق کو اپنی طرف سے حرام قرار نہیں دینا چاہیے، جبکہ بے حیائی، برائی اور اللہ کی نافرمانی سے بچنا چاہیے۔'},
    {q:'اعراف کیا ہے اور اصحابِ اعراف کا رویہ کیا ہوگا؟',a:'اعراف جنت اور جہنم کے درمیان ایک بلند جگہ ہے۔ اصحابِ اعراف لوگوں کو ان کی نشانیوں سے پہچانیں گے، اہلِ جنت کو سلام کریں گے اور اہلِ جہنم کو دیکھ کر اللہ سے دعا کریں گے کہ انہیں ظالم لوگوں کے ساتھ شامل نہ کیا جائے۔'}
  ]);
  addExercise(tarjuma,[
    {group:'مختصر جواب · Paper Ready',q:'سورۃ الاعراف کا مرکزی موضوع کیا ہے؟',a:'توحید، رسالت اور آخرت کے عقائد کے ساتھ قرآن کی ہدایت کی پیروی، انبیاء کی اطاعت اور شیطان کے فریب سے بچنے کی تعلیم اس سورت کا مرکزی پیغام ہے۔'},
    {group:'مختصر جواب · Paper Ready',q:'سورۃ الاعراف میں اسراف سے کیا مراد ہے؟',a:'ضرورت سے بڑھ کر خرچ کرنا، نعمتوں کو ضائع کرنا یا کھانے پینے میں حد سے تجاوز کرنا اسراف ہے، جس سے قرآن منع کرتا ہے۔'},
    {group:'مختصر جواب · Paper Ready',q:'حضرت آدمؑ کے واقعے سے توبہ کے بارے میں کیا سبق ملتا ہے؟',a:'غلطی کے بعد اپنی کوتاہی تسلیم کر کے اللہ سے معافی مانگنی چاہیے اور سچی توبہ کرنی چاہیے۔'}
  ]);

  root.version = Math.max(Number(root.version || 1), 2);
})();
