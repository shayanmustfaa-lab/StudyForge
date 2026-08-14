window.STUDYFORGE_BOOKS = {
  version: 1,
  subjects: [
    {
      id:'maths', name:'Maths', rtl:false,
      units:[
        {id:'m1',no:'Unit 1',title:'Complex Numbers',topicQA:[
          {q:'What is a complex number?',a:'A complex number is written as z = a + bi, where a and b are real numbers and i² = −1.'},
          {q:'What is the conjugate of z = a + bi?',a:'The conjugate is z̄ = a − bi.'},
          {q:'How is the modulus of z = a + bi found?',a:'|z| = √(a² + b²). It represents the distance of the point (a,b) from the origin in the complex plane.'},
          {q:'For z = −3 + 4i, find |z|.',a:'|z| = √[(-3)² + 4²] = √25 = 5.'},
          {q:'What happens when a complex number is multiplied by its conjugate?',a:'If z = a + bi, then zz̄ = a² + b² = |z|².'},
          {q:'How do we solve simultaneous equations with complex coefficients?',a:'Use ordinary elimination/substitution while treating i algebraically with i² = −1. If the unknowns are real, equate real parts and imaginary parts separately when appropriate.'}
        ],exercise:[
          {group:'Exercise 1.3',q:'Find the modulus of 4 + 3i.',a:'|4+3i| = √(4²+3²) = √25 = 5.'},
          {group:'Exercise 1.3',q:'Find the modulus of −5 − 4i.',a:'|−5−4i| = √[(-5)²+(-4)²] = √41.'},
          {group:'Exercise 1.3',q:'For z = 5 − 2i, verify that z̄̄ = z.',a:'z̄ = 5 + 2i, so z̄̄ = 5 − 2i = z. Verified.'},
          {group:'Exercise 1.3',q:'For z = 5 − 2i, verify zz̄ = |z|².',a:'zz̄=(5−2i)(5+2i)=25−(2i)²=29. Also |z|²=(√29)²=29. Hence verified.'},
          {group:'Exercise 1.3',q:'If z₁ = 2 + 3i and z₂ = −1 + i, find Re(z₁z₂) and Im(z₁z₂).',a:'z₁z₂=(2+3i)(−1+i)=−5−i. Therefore Re(z₁z₂)=−5 and Im(z₁z₂)=−1.'},
          {group:'Exercise 1.4',q:'Find real and imaginary parts of (8 − 3i)².',a:'(8−3i)²=64−48i+9i²=55−48i. Real part = 55; imaginary part = −48.'},
          {group:'Exercise 1.4',q:'Find real and imaginary parts of (5 + 3i)⁻¹.',a:'1/(5+3i)=(5−3i)/(25+9)=5/34−(3/34)i. Real part = 5/34; imaginary part = −3/34.'},
          {group:'Exercise 1.4',q:'Solve: z + w = 3i and 2z + 3w = 2.',a:'From z=3i−w. Substitute: 2(3i−w)+3w=2 ⇒ w=2−6i. Then z=3i−(2−6i)=−2+9i.'},
          {group:'Review Exercise 1',q:'Simplify i³⁷.',a:'37 mod 4 = 1, therefore i³⁷ = i.'},
          {group:'Review Exercise 1',q:'Find additive and multiplicative inverse of z = 8 + 9i.',a:'Additive inverse = −8−9i. Multiplicative inverse = 1/(8+9i) = (8−9i)/(64+81) = (8−9i)/145.'},
          {group:'Review Exercise 1',q:'If z₁ = 5+4i and z₂ = 3+2i, find z₁z₂.',a:'(5+4i)(3+2i)=15+10i+12i+8i²=7+22i.'}
        ]},
        {id:'m2',no:'Unit 2',title:'Quadratic Equations and Inequalities'},
        {id:'m3',no:'Unit 3',title:'Matrices and Determinants'},
        {id:'m4',no:'Unit 4',title:'Functions and Graphs'},
        {id:'m5',no:'Unit 5',title:'Algebraic Fractions'},
        {id:'m6',no:'Unit 6',title:'Vectors in Plane'},
        {id:'m7',no:'Unit 7',title:'Trigonometry'},
        {id:'m8',no:'Unit 8',title:'Chords and Arcs of a Circle'},
        {id:'m9',no:'Unit 9',title:'Tangent and Angles of a Circle'},
        {id:'m10',no:'Unit 10',title:'Practical Geometry of Circles'},
        {id:'m11',no:'Unit 11',title:'Information Handling'},
        {id:'m12',no:'Unit 12',title:'Probability'}
      ]
    },
    {
      id:'physics', name:'Physics', rtl:false,
      units:[
        {id:'p10',no:'Chapter 10',title:'Thermal Physics',topicQA:[
          {q:'What is linear thermal expansion?',a:'It is the increase in length of a solid when its temperature rises. ΔL = αL₀ΔT.'},
          {q:'What is latent heat?',a:'Latent heat is heat energy used to change the state of a substance without changing its temperature.'},
          {q:'What is latent heat of fusion?',a:'It is the heat required to convert 1 kg of a solid into liquid at its melting point without temperature change. Q = mLᶠ.'},
          {q:'What is latent heat of vaporization?',a:'It is the heat required to convert 1 kg of liquid into gas at its boiling point without temperature change. Q = mLᵥ.'},
          {q:'Why does evaporation cause cooling?',a:'Higher-energy molecules escape from the liquid surface. The remaining molecules have lower average kinetic energy, so the liquid and surroundings cool.'},
          {q:'What is superconductivity?',a:'It is the state in which a material has zero electrical resistance below a critical temperature.'}
        ],exercise:[
          {group:'MCQ',q:'When the temperature of a copper rod is increased, what happens to its length?',a:'It increases.'},
          {group:'MCQ',q:'The amount by which unit length increases for a 1°C temperature rise is called what?',a:'Coefficient of linear expansion.'},
          {group:'MCQ',q:'Which property determines how much heat a solid can absorb before its temperature changes significantly?',a:'Specific heat capacity.'},
          {group:'Short Answer',q:'What factors influence the thermal expansion of solids?',a:'The original dimensions, the temperature change, and the material’s coefficient of expansion.'},
          {group:'Short Answer',q:'What is latent heat of fusion?',a:'The heat energy required to change 1 kg of a solid to liquid at its melting point without changing temperature.'},
          {group:'Short Answer',q:'How does evaporation contribute to cooling in everyday life?',a:'Fast molecules escape from a liquid and take energy with them, lowering the average kinetic energy and temperature of the remaining liquid. Sweating and wet-cloth cooling are common examples.'},
          {group:'Constructed Response',q:'Why do electric transmission wires sag in summer and tighten in winter?',a:'Metal wires expand when temperature rises in summer, increasing their length and causing sagging. In winter they contract, so the wires become tighter.'},
          {group:'Numerical 10.1',q:'A 1 m rod expands by 0.02 m from 20°C to 120°C. Find α.',a:'α=ΔL/(L₀ΔT)=0.02/(1×100)=2.0×10⁻⁴ K⁻¹.'},
          {group:'Numerical 10.3',q:'A 2 m steel rod at 20°C has α=1.2×10⁻⁵ °C⁻¹. Find its length at 100°C.',a:'ΔT=80°C. ΔL=αL₀ΔT=(1.2×10⁻⁵)(2)(80)=0.00192 m. Final length=2.00192 m ≈ 2.002 m.'},
          {group:'Numerical 10.5',q:'Heat needed to raise 2 kg iron from 20°C to 100°C if c=450 J kg⁻¹ K⁻¹?',a:'Q=mcΔT=2×450×80=72,000 J=72 kJ.'},
          {group:'Numerical 10.6',q:'Heat needed to melt 500 g ice at 0°C if Lᶠ=3.36×10⁵ J kg⁻¹?',a:'m=0.5 kg. Q=mLᶠ=0.5×3.36×10⁵=1.68×10⁵ J=168 kJ.'}
        ]},
        {id:'p11',no:'Chapter 11',title:'Transfer of Thermal Energy'},
        {id:'p12',no:'Chapter 12',title:'Waves'},
        {id:'p13',no:'Chapter 13',title:'Sound'},
        {id:'p14',no:'Chapter 14',title:'Light'},
        {id:'p15',no:'Chapter 15',title:'Electrostatics'},
        {id:'p16',no:'Chapter 16',title:'Electricity'},
        {id:'p17',no:'Chapter 17',title:'Electromagnetism'},
        {id:'p18',no:'Chapter 18',title:'Electromagnetic Induction and Electromagnetic Waves'},
        {id:'p19',no:'Chapter 19',title:'Electronics'},
        {id:'p20',no:'Chapter 20',title:'Atomic and Nuclear Physics'},
        {id:'p21',no:'Chapter 21',title:'Space and Environment'}
      ]
    },
    {
      id:'chemistry', name:'Chemistry', rtl:false,
      units:[
        {id:'c14',no:'Chapter 14',title:'States of Matter and Phase Changes',topicQA:[
          {q:'Why are solids, liquids and gases different according to kinetic particle theory?',a:'They differ mainly in particle arrangement, movement, kinetic energy and strength of inter-particle attractions.'},
          {q:'What is diffusion?',a:'Diffusion is the spontaneous movement and mixing of particles from a region of higher concentration to lower concentration.'},
          {q:'Why does diffusion become faster at higher temperature?',a:'Particles gain kinetic energy, move faster and mix more rapidly.'},
          {q:'Why does ammonia diffuse faster than hydrogen chloride?',a:'Ammonia has lower molar mass, so at the same temperature its molecules have higher average speed and diffuse faster.'},
          {q:'What is deposition?',a:'Deposition is the direct change of a gas or vapour into a solid without passing through the liquid state.'},
          {q:'Why does temperature remain constant during a phase change?',a:'The supplied or released energy changes intermolecular attractions rather than the average kinetic energy of particles, so temperature remains constant until the phase change is complete.'}
        ],exercise:[
          {group:'MCQ',q:'According to kinetic theory, the basic difference between solid, liquid and gas is due to what?',a:'The difference in movements of the particles.'},
          {group:'MCQ',q:'What happens to the rate of evaporation upon heating?',a:'It increases.'},
          {group:'MCQ',q:'In which state are inter-particle attractions strongest?',a:'Solid.'},
          {group:'MCQ',q:'Gas changing directly into solid is called what?',a:'Deposition.'},
          {group:'Short Answer 14.1',q:'From where does the energy come when a liquid evaporates?',a:'The highest-energy molecules use thermal energy already present in the liquid and absorb energy from the surroundings to overcome intermolecular attractions.'},
          {group:'Short Answer 14.2',q:'Is condensation an endothermic process?',a:'No. Condensation is exothermic because gas particles lose energy and release heat to the surroundings when they become liquid.'},
          {group:'Short Answer 14.3',q:'Why do naphthalene balls disappear after some time?',a:'Naphthalene sublimes: its solid particles escape directly into the vapour state, so the balls gradually become smaller and disappear.'},
          {group:'Short Answer 14.4',q:'Why does temperature remain constant during a phase change?',a:'Energy is used to break or form intermolecular attractions rather than increase particle kinetic energy, so temperature stays constant during the change.'},
          {group:'Constructed Response 14.1',q:'Differentiate between evaporation and boiling.',a:'Evaporation is a slow surface process that can occur at any temperature below the boiling point. Boiling occurs throughout the liquid at a fixed boiling temperature (for a given pressure) and forms bubbles.'},
          {group:'Descriptive 14.1',q:'Explain different rates of diffusion of two gases using kinetic theory.',a:'At the same temperature gases have the same average kinetic energy. Because KE=½mv², lighter molecules must have higher average speed than heavier molecules, so the lighter gas diffuses faster.'}
        ]},
        {id:'c15',no:'Chapter 15',title:'Stoichiometry'},
        {id:'c16',no:'Chapter 16',title:'Electrochemistry'},
        {id:'c17',no:'Chapter 17',title:'Reaction Kinetics'},
        {id:'c18',no:'Chapter 18',title:'Salts'},
        {id:'c19',no:'Chapter 19',title:'Nitrogen and Sulphur'},
        {id:'c20',no:'Chapter 20',title:'Water'},
        {id:'c21',no:'Chapter 21',title:'Organic Chemistry'},
        {id:'c22',no:'Chapter 22',title:'Hydrocarbons'},
        {id:'c23',no:'Chapter 23',title:'Monohydroxy Alkanes / Alcohols'},
        {id:'c24',no:'Chapter 24',title:'Carboxylic Acids'},
        {id:'c25',no:'Chapter 25',title:'Biochemistry'},
        {id:'c26',no:'Chapter 26',title:'Polymers'}
      ]
    },
    {
      id:'computer', name:'Computer Science', rtl:false,
      units:[
        {id:'cs1',no:'Unit 1',title:'Operating Systems: Structure and Services',topicQA:[
          {q:'What is an operating system?',a:'An operating system is system software that manages computer hardware, runs applications, and provides an interface between the user and hardware.'},
          {q:'What is the kernel?',a:'The kernel is the core part of the operating system that directly manages CPU, memory, devices and other system resources.'},
          {q:'What is the shell?',a:'The shell is the outer part of the OS that interacts with the user and passes commands to the kernel. It may be graphical or command-line based.'},
          {q:'What are the main stages of a process life cycle?',a:'Creation, execution and termination.'},
          {q:'What does FCFS scheduling mean?',a:'First-Come, First-Served runs processes in the order in which they arrive.'}
        ],exercise:[
          {group:'MCQ Answer Key',q:'Which option corresponds to equal access and data privacy?',a:'Option A — Equal access and data privacy.'},
          {group:'MCQ Answer Key',q:'Which OS component is the core controller?',a:'Kernel.'},
          {group:'MCQ Answer Key',q:'How does FCFS execute processes?',a:'In the order they arrive.'},
          {group:'MCQ Answer Key',q:'What do threads in the same process share?',a:'They share the same memory and resources.'}
        ]},
        {id:'cs2',no:'Unit 2',title:'System Recovery and Advanced Maintenance',topicQA:[
          {q:'Why is continuous maintenance important after troubleshooting?',a:'It helps prevent the same issue from returning, reduces future problems, improves performance, extends system life and reduces disruptions.'},
          {q:'What is Disk Cleanup used for?',a:'It removes temporary and unnecessary files such as cache, update leftovers and Recycle Bin items to free disk space safely.'},
          {q:'Why are system documentation and logs useful?',a:'They record installations, repairs, issues and updates, making future maintenance and troubleshooting easier.'}
        ],exercise:[
          {group:'MCQ',q:'Task Manager is mainly used to do what?',a:'Monitor running applications.'},
          {group:'MCQ',q:'Safe Mode starts Windows with what?',a:'Basic drivers only.'},
          {group:'MCQ',q:'Bootable USB drives are used for what?',a:'System repair and recovery.'},
          {group:'MCQ',q:'In UEFI systems, a bootable USB should use which partition style?',a:'GPT style.'},
          {group:'MCQ',q:'When is POST performed?',a:'At system startup.'}
        ]},
        {id:'cs3',no:'Unit 3',title:'Introduction to Python Programming',topicQA:[
          {q:'What is computer programming?',a:'It is the process of creating instructions in a programming language so a computer can perform specific tasks.'},
          {q:'Why should “Add Python to PATH” be checked during installation?',a:'It lets Python be run more easily from the command line without manually specifying the executable path.'},
          {q:'What is operator precedence?',a:'Operator precedence is the order in which operations are evaluated. Parentheses have highest priority, followed by exponentiation, multiplication/division/modulus, then addition/subtraction.'}
        ],exercise:[
          {group:'MCQ',q:'Which step is NOT part of the basic programming process: Write Code, Compile/Interpret, Execute, Ignore Errors?',a:'Ignore Errors.'},
          {group:'MCQ',q:'What should you do during Python installation to run it from the command line more easily?',a:'Check “Add Python to PATH”.'},
          {group:'MCQ',q:'What is the output of print(10 // 3)?',a:'3.'},
          {group:'MCQ',q:'What data type does input() return by default?',a:'String.'},
          {group:'MCQ',q:'Which operator has the highest precedence: +, *, **, or parentheses?',a:'Parentheses.'}
        ]},
        {id:'cs4',no:'Unit 4',title:'Control Structures in Python'},
        {id:'cs5',no:'Unit 5',title:'Introduction to Data Science'},
        {id:'cs6',no:'Unit 6',title:'Introduction to Artificial Intelligence (AI) and Machine Learning (ML)'},
        {id:'cs7',no:'Unit 7',title:'Applications of AI',topicQA:[
          {q:'What is NLP?',a:'Natural Language Processing is an AI field that enables computers to understand, process and generate human language.'},
          {q:'Why does AI need large, good-quality data?',a:'Large data exposes the system to many examples; good-quality data is accurate and well-labelled, reducing wrong patterns and unfair decisions.'},
          {q:'What is bias in AI?',a:'Bias is systematic unfairness in AI outputs, often caused by unrepresentative, poor-quality or historically biased data and design choices.'}
        ],exercise:[
          {group:'MCQ',q:'What does AI stand for?',a:'Artificial Intelligence.'},
          {group:'MCQ',q:'Which is an example of NLP: online calculator, voice typing, file copying, or image editing?',a:'Voice typing.'},
          {group:'MCQ',q:'Which technology uses AI to understand human voice?',a:'Speech recognition.'},
          {group:'Short Answer',q:'What is Artificial Intelligence (AI)?',a:'AI is the ability of a machine or computer program to perform tasks that normally require human intelligence, such as understanding speech, recognizing images or making decisions.'},
          {group:'Short Answer',q:'Why should AI systems be transparent and fair?',a:'Transparency helps people understand decisions; fairness reduces unjust discrimination and helps ensure equal treatment of users.'}
        ]},
        {id:'cs8',no:'Unit 8',title:'Digital Entrepreneurship',topicQA:[
          {q:'What are intellectual property rights?',a:'Legal rights that protect creations such as inventions, books, software, logos and brand names.'},
          {q:'What is data-driven marketing?',a:'Marketing decisions based on facts, customer data and measurable analysis rather than guesswork.'},
          {q:'What is CRM?',a:'Customer Relationship Management is a system/approach for managing customer interactions, data and relationships to improve service and retention.'},
          {q:'What is marketing automation?',a:'Using software to automate routine marketing tasks such as emails, follow-ups, social posts and performance reporting.'}
        ],exercise:[
          {group:'MCQ',q:'Which is an example of intellectual property: shop furniture, brand logo, raw materials, or office rent?',a:'Brand logo.'},
          {group:'MCQ',q:'Which law protects personal data in the European Union?',a:'GDPR.'},
          {group:'MCQ',q:'What does ROI mean in marketing?',a:'Return on Investment.'},
          {group:'Short Answer',q:'How does copyright protect creators in the digital world?',a:'It gives creators legal control over copying, distributing and using their original work, allowing action against unauthorized use.'},
          {group:'Short Answer',q:'Differentiate between a patent and a trademark.',a:'A patent protects a new invention or method; a trademark protects a brand identifier such as a name, logo or symbol.'},
          {group:'Short Answer',q:'Explain the purpose of setting KPIs in marketing.',a:'KPIs provide measurable targets so a business can track campaign performance, compare results with goals and improve decisions.'}
        ]}
      ]
    },
    {
      id:'english', name:'English', rtl:false,
      units:[
        {id:'e1',no:'Unit 1',title:'Hazrat Muhammad’s ﷺ Social Reforms for the Rights of Women, Orphans and Slaves',topicQA:[
          {q:'What was the condition of women in pre-Islamic Arabia?',a:'Women were generally denied important social and legal rights, including inheritance and free consent in marriage, and were often treated as inferior.'},
          {q:'Name three rights introduced for women.',a:'The right to inheritance, the requirement of a woman’s consent in marriage, and fair treatment/financial protection in matters such as divorce.'},
          {q:'How were orphans protected?',a:'Their property had to be safeguarded, guardians were forbidden to misuse it, and society was instructed to care for and treat orphans fairly.'},
          {q:'What does emancipation mean?',a:'Freedom from restrictions, especially freedom from slavery.'},
          {q:'How did Islam encourage humane treatment of slaves?',a:'It required kind and humane treatment, prohibited mistreatment, encouraged freeing slaves and provided routes such as mukataba for emancipation.'}
        ],exercise:[
          {group:'Reading & Critical Thinking',q:'What was the social condition of women, orphans, and slaves in pre-Islamic Arabia?',a:'They were among the most vulnerable groups and were often denied rights, protection and dignity. Women lacked many legal/social rights, orphans’ property could be exploited, and slaves could be treated harshly.'},
          {group:'Reading & Critical Thinking',q:'What are three specific rights introduced for women?',a:'Inheritance rights, consent in marriage, and fair treatment/financial safeguards including after divorce.'},
          {group:'Reading & Critical Thinking',q:'How did Hazrat Muhammad ﷺ promote emancipation of slaves?',a:'He encouraged freeing slaves as a virtuous act, supported legal mechanisms for freedom such as mukataba, and promoted humane treatment that reduced the institution’s abuses.'},
          {group:'Reading & Critical Thinking',q:'What steps ensured humane treatment of slaves?',a:'Masters were instructed to treat slaves kindly, provide humane living conditions, avoid abuse and recognize their legal and moral rights.'}
        ]},
        {id:'e2',no:'Unit 2',title:'My Beloved Pakistan (Poem)'},
        {id:'e3',no:'Unit 3',title:'Digital Globalisation Transforming the English Language'},
        {id:'e4',no:'Unit 4',title:'The Earth: Act Now for Tomorrow'},
        {id:'e5',no:'Unit 5',title:'The Happy Prince'},
        {id:'e6',no:'Unit 6',title:'Drug Abuse'},
        {id:'e7',no:'Unit 7',title:'Time (Poem)'},
        {id:'e8',no:'Unit 8',title:'Pollution-Free Pakistan with Greenery All Around'},
        {id:'e9',no:'Unit 9',title:'The Road Not Taken (Poem)'},
        {id:'e10',no:'Unit 10',title:'The Three Questions'}
      ]
    },
    {
      id:'urdu', name:'Urdu', rtl:true,
      units:[
        {id:'u1',no:'سبق 1',title:'حمد',topicQA:[
          {q:'حمد کسے کہتے ہیں؟',a:'اللہ تعالیٰ کی تعریف و توصیف میں کہے گئے کلام کو حمد کہتے ہیں۔'},
          {q:'اس حمد کے شاعر کون ہیں؟',a:'امیر مینائی۔'},
          {q:'حمد میں بنیادی مضمون کیا ہے؟',a:'اللہ تعالیٰ کی عظمت، قدرت، حمد و ثنا اور انسان کی عاجزی و بندگی۔'}
        ]},
        {id:'u2',no:'سبق 2',title:'نعت'},
        {id:'u3',no:'سبق 3',title:'اخلاقِ نبوی ﷺ'},
        {id:'u4',no:'سبق 4',title:'سرسید کا بچپن'},
        {id:'u5',no:'سبق 5',title:'محسنِ عالم'},
        {id:'u6',no:'سبق 6',title:'گناہ گار'},
        {id:'u7',no:'سبق 7',title:'سویرے جو کل آنکھ میری کھلی'},
        {id:'u8',no:'سبق 8',title:'دوستی کا پھل'},
        {id:'u9',no:'سبق 9',title:'میرا گاؤں'},
        {id:'u10',no:'سبق 10',title:'بابل کے کھنڈر'},
        {id:'u11',no:'سبق 11',title:'اولادِ نیک'},
        {id:'u12',no:'سبق 12',title:'کچھ روز پر تعلیم کے باب میں'},
        {id:'u13',no:'سبق 13',title:'آدمی نامہ'},
        {id:'u14',no:'سبق 14',title:'نمودِ صبح'},
        {id:'u15',no:'سبق 15',title:'خطاب بہ جوانانِ اسلام'},
        {id:'u16',no:'سبق 16',title:'وغیرہ'},
        {id:'u17',no:'سبق 17',title:'نظم 17'},
        {id:'u18',no:'سبق 18',title:'نظم 18'},
        {id:'u19',no:'سبق 19',title:'نظم 19'},
        {id:'u20',no:'سبق 20',title:'نظم 20'}
      ]
    },
    {
      id:'pakstudies', name:'Pakistan Studies', rtl:true,
      units:[
        {id:'ps1',no:'باب 1',title:'پاکستان کی نظریاتی اساس',topicQA:[
          {q:'نظریہ کیا ہے؟',a:'نظریہ خیالات، عقائد اور اصولوں کا ایسا منظم مجموعہ ہے جو افراد یا قوم کو مقصد، سمت اور شناخت فراہم کرتا ہے۔'},
          {q:'نظریہ پاکستان کی بنیادی اساس کیا ہے؟',a:'اسلامی عقائد، اقدار اور مسلمانوں کی جداگانہ قومی و تہذیبی شناخت نظریۂ پاکستان کی بنیادی اساس ہیں۔'},
          {q:'نظریہ کسی قوم کے لیے کیوں اہم ہوتا ہے؟',a:'یہ قوم کو اتحاد، مقصد، شناخت اور مشترکہ سمت دیتا ہے اور مشکلات میں اجتماعی رہنمائی فراہم کرتا ہے۔'}
        ]},
        {id:'ps2',no:'باب 2',title:'تحریکِ پاکستان اور پاکستان کا قیام'},
        {id:'ps3',no:'باب 3',title:'تاریخِ پاکستان (1971ء تا حال)'},
        {id:'ps4',no:'باب 4',title:'پاکستان اور دنیا'},
        {id:'ps5',no:'باب 5',title:'زمین اور ماحول'},
        {id:'ps6',no:'باب 6',title:'آبادی، معاشرہ اور پاکستان کی ثقافت'},
        {id:'ps7',no:'باب 7',title:'پاکستان کی معاشی ترقی'},
        {id:'ps8',no:'باب 8',title:'خواتین کو بااختیار بنانا'}
      ]
    },
    {
      id:'tarjuma', name:'Tarjuma-tul-Quran', rtl:true,
      units:[
        {id:'t1',no:'سورت 1',title:'سورۃ الانعام',topicQA:[
          {q:'سورۃ الانعام کا مرکزی مضمون کیا ہے؟',a:'توحید، اللہ تعالیٰ کی قدرت، شرک کی تردید، رسالت اور آخرت کے بنیادی عقائد اس سورت کے مرکزی مضامین ہیں۔'},
          {q:'توحید سے کیا مراد ہے؟',a:'یہ عقیدہ کہ اللہ تعالیٰ ایک ہے، وہی خالق و مالک ہے اور عبادت صرف اسی کی کی جائے۔'},
          {q:'شرک کی تردید کیوں کی گئی ہے؟',a:'کیونکہ عبادت اور حقیقی اختیار اللہ تعالیٰ ہی کا حق ہے؛ کسی مخلوق کو اس کا شریک ٹھہرانا اسلامی عقیدے کے خلاف ہے۔'}
        ]},
        {id:'t2',no:'سورت 2',title:'سورۃ الاعراف'},
        {id:'t3',no:'سورت 3',title:'سورۃ یونس'},
        {id:'t4',no:'سورت 4',title:'سورۃ ہود'},
        {id:'t5',no:'سورت 5',title:'سورۃ الرعد'},
        {id:'t6',no:'سورت 6',title:'سورۃ ابراہیم'},
        {id:'t7',no:'سورت 7',title:'سورۃ الحجر'},
        {id:'t8',no:'سورت 8',title:'سورۃ النحل'},
        {id:'t9',no:'سورت 9',title:'سورۃ بنی اسرائیل'},
        {id:'t10',no:'سورت 10',title:'سورۃ الکہف'},
        {id:'t11',no:'سورت 11',title:'سورۃ المؤمنون'},
        {id:'t12',no:'سورت 12',title:'سورۃ الزمر'},
        {id:'t13',no:'سورت 13',title:'سورۃ المؤمن (غافر)'},
        {id:'t14',no:'سورت 14',title:'سورۃ حم السجدہ (فصلت)'},
        {id:'t15',no:'سورت 15',title:'سورۃ الشوریٰ'}
      ]
    }
  ]
};
